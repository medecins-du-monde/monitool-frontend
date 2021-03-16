import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { v4 as uuid } from 'uuid';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import InformationItem from 'src/app/models/interfaces/information-item';
import informationIntro from 'src/app/models/interfaces/information-intro';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy, AfterViewChecked {

  countries = [];
  statuses = [
    {
      text: 'OngoingPlural',
      value: 'Ongoing',
      count: 0
    },
    {
      text: 'FinishedPlural',
      value: 'Finished',
      count: 0
    },
    {
      text: 'DeletedPlural',
      value: 'Deleted',
      count: 0
    }
  ];

  informationIntro = {
      title: 'Liste de projets',
      description: 'La liste des projets est votre point d\'entrée pour toutes les tâches que vous pourrez réaliser sur l\'outil.'
    } as informationIntro;

  informations = [
    {
      question: 'Un projet dans Monitool, c\'est quoi ?',
      response : 'Sur Monitool, on ne parle pas de base de données, de requêtes, de dimensions, de jointures... <br>Un projet, est un projet au sens entendu dans une organisation humanitaire, le même que celui pour lequel vous rédigez un proposal à votre bailleur de fonds. '
    } as InformationItem,
    {
      question: 'Pourquoi peut-on créer plusieurs projets par compte, alors qu\'un seul suffit?',
      response: ' Ça n\'a pas d\'utilité d\'un point de vue terrain, mais certains utilisateurs doivent pouvoir accéder à de nombreux projets qu\'ils ne crée pas eux-même. <br>Notament des salariés siège, régionaux ou des consultants '
    } as InformationItem,
    {
      question: 'Comment retourner sur les pages de configuration sur un projet que j\'ai déjà créé?',
      response: ' Sur votre projet, à droite du bouton ouvrir, clickez sur pour les voir toutes les actions possibles.'
    } as InformationItem,
    {
      question: 'Quelle est l\'utilité de pouvoir "Cloner la structure" d\'un projet?',
      response: 'La fonctionalité "Cloner la structure uniquement" est pensée pour les ONGs qui réalisent des programmes d\'urgence. En effet dans ce cas, plutot que de prendre le temps de réflexion nécessaire à la construction d\'un projet, il est fréquent de créer en avance différents squelettes de projets avec toutes les sources de données et le cadre logique prêts à l\'emploi. Lorsqu\'une nouvelle crise démarre le système de monitoring peut ainsi être opérationel en quelques minutes. Il suffit alors de cloner la structure du squelette adapté à la situation, et de renommer le projet, l\'adaptation du projet au contexte viendra dans une phase ultérieur du projet.'
    } as InformationItem,
    {
      question: 'Quelle est l\'utilité de pouvoir "Cloner structure et données" d\'un projet?',
      response: ' La fonctionalité "Cloner structure et données" intervient géneralement au moment d\'un changement de bailleur ou un changement majeur dans l\'appareil de monitoring d\'un projet long terme. <br>Il permet de prendre une photographie d\'un projet, avec sa structure et toutes ses saisies à un instant donné et à la conserver dans le long terme. '
    } as InformationItem,
    {
      question: 'J\'ai archivé mon projet par erreur, comment le récuperer?',
      response: `Cliquez sur <button>Afficher les projets restaurés</button>, puis sur <button>Restaurer</button>`
    } as InformationItem,
    {
      question: 'Mon projet a disparu! Où est-il?',
      response: 'Pas de panique! <br> Plusieurs explications sont possibles: <br><ul><li>Votre projet ne correspond pas au filtre que vous avez rentré. Videz la barre de saisie de texte en haut de la page</li><li>Votre projet vient de terminer. Cliquez sur <button>Afficher les projets terminés</button> . Vous pouvez éditeur sa date de fin pour le prolonger.</li><li>Vous avez archivé votre projet. Cliquez sur <button>Afficher les projets archivés</button> puis sur <button>Archiver</button></li></ul><br> Si votre projet est toujours manquant, il est possible que vous ne soyez pas connecté avec le même compte que celui que vous avez utilisé pour créer votre projet.<br> Cliquez sur <button>Deconnecter</button> puis connectez-vous avec le compte que vous avez utilisé pour créer votre projet. Si vous le désirez, vous pourrez transférer le projet sur votre nouveau compte. '
    } as InformationItem,
    {
      question: 'Combien de temps mon projet va-t\'il resté stocké sur Monitool?',
      response: ' Pendant toute la durée de vie de l\'outil: les coûts de stockage des projets sont faibles par rapport aux coûts de développement et d\'hébergement de la plateforme. <br>Il ne nous est donc pas nécessaire de supprimer les anciens projets pour « faire de la place ». <br>Si votre ONG dispose de règles au sujet de l\'archivage électronique pour les projet terminés, vous pouvez télécharger toutes les données saisies par projet depuis la page "Rapport Général".'
    } as InformationItem
  ];

  filtersForm: FormGroup;
  projects: Project[];
  allProjects: Project[];
  currentUser: User;

  private subscription: Subscription = new Subscription();

  @ViewChild('allSelected') private allSelected: MatOption;

  get currentLang(): string{
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  get selectedCountries(): [] {
    return this.filtersForm.value.countries.filter(countrie => countrie !== '0') as [];
  }

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private translateService: TranslateService,
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      search: '',
      countries: [[]],
      themes: [[]],
      statuses: [['Ongoing']]
    });
    this.getProjects();
    this.filtersForm.valueChanges.subscribe(() => {
      this.onFilterChange();
    });

    this.subscription.add(
      this.authService.currentUser.subscribe((user: User) => {
        this.currentUser = new User(user);
      })
    );
    this.projectService.updateInformationPanel(this.informations);
    this.projectService.updateInformationIntro(this.informationIntro);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  public getProjects() {
    this.projectService.list().then((res: Project[]) => {
      this.allProjects = res;
      this.countries = [... new Set(res.map(x => x.country))];
      this.filtersForm.controls.countries.setValue(this.countries.concat(['0']));
      const listToReturn = this.projects.sort((a, b) => {
        // If owner of at least one of both project
        if (a.users.find(user => this.isOwner(user))
        || b.users.find(user => this.isOwner(user))
        ) {
          // If owner of both project
          if (a.users.find(user => this.isOwner(user))
          && b.users.find(user => this.isOwner(user))
          ) {
            // alphabetical order
            return a.country.localeCompare(b.country);
          } else if (a.users.find(user => this.isOwner(user))) {
            return -1;
          } else {
            return 1;
          }
        } else if (localStorage.getItem('user::' + this.currentUser.id + 'favorite' + a.id)){
          if (localStorage.getItem('user::' + this.currentUser.id + 'favorite' + b.id)) {
            return a.country.localeCompare(b.country);
          } else {
            return -1;
          }
        } else {
          return 1;
        }
      });
      this.setCountProjectStatus(res);
      return listToReturn;
    });
  }

  setCountProjectStatus(res: Project[]) {
      this.statuses.forEach((value, index) => {
        this.statuses[index].count = res.filter(project => project.status === value.value).length;
      });
  }

  onCreate(): void {
    const project = new Project();
    project.id = `project:${uuid()}`;
    const user = new User({type: 'internal', role: 'owner', id: this.currentUser.id});
    project.users.push(user);
    this.projectService.create(project);
    this.router.navigate(['/projects', project.id]);
  }

  onDelete(project: Project): void {
    this.projectService.delete(project.id).then(() => {
      this.getProjects();
    });
  }

  onRestore(project: Project): void {
    this.projectService.restore(project.id).then(() => {
      this.getProjects();
    });
  }

  onClone(project: Project): void {
    this.projectService.clone(project.id).then(() => {
      this.getProjects();
    });
  }

  onToggleCountry() {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return;
    }
    if (this.filtersForm.value.countries.length === this.countries.length) {
      this.allSelected.select();
    }
  }

  onToggleAllCountries() {
    if (this.allSelected.selected) {
      // TODO: Change this thing of the 0.
      this.filtersForm.controls.countries
        .setValue([...this.countries, '0']);
    } else {
      this.filtersForm.controls.countries.setValue([]);
    }
  }

  onSearch(e: any): void {
    this.filtersForm.controls.search.setValue(e);
  }

  onFilterChange(): void {
    let filteredProjects = this.filterByText(this.allProjects);
    filteredProjects = this.filterByCountries(filteredProjects);
    filteredProjects = this.filterByStatuses(filteredProjects);
    this.projects = filteredProjects;
  }

  private filterByText(projects: Project[]): Project[] {
    const search = this.filtersForm.value.search.toLowerCase();
    return projects.filter(project =>
      project.name.toLowerCase().includes(search) ||
      project.country.toLowerCase().includes(search) ||
      project.themes.find(theme => theme.shortName[this.currentLang].toLowerCase().includes(search))
    );
  }

  private filterByCountries(projects: Project[]): Project[] {
    const countries = this.filtersForm.value.countries;
    if (countries.length > 0) {
      return projects.filter(project => countries.includes(project.country));
    } else {
      return [];
    }
  }

  private filterByStatuses(projects: Project[]): Project[] {
    let filteredProjects = [];
    const statuses = this.filtersForm.value.statuses;
    if (statuses.includes('Ongoing')) {
      filteredProjects = filteredProjects.concat(projects.filter(project => project.status === 'Ongoing'));
    }
    if (statuses.includes('Finished')) {
      filteredProjects = filteredProjects.concat(projects.filter(project => project.status === 'Finished'));
    }
    if (statuses.includes('Deleted')) {
      filteredProjects = filteredProjects.concat(projects.filter(project => project.status === 'Deleted'));
    }
    return filteredProjects;
  }

  private isOwner(user: User) {
    return user.role === 'owner' && user.id === this.currentUser.id;
  }
}
