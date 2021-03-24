import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DateService} from 'src/app/services/date.service';
import { User } from 'src/app/models/classes/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isMobile: boolean;
  user: User;
  // Remove settings from header when a user is not an admin
  public settingsVisible: boolean = true;

  headerLinkList = [];

  constructor(
    private translateService: TranslateService,
    private dateService: DateService,
    private authService: AuthService,
    private route: Router,
  ) { }

  ngOnInit(): void{
    window.onresize = () => this.isMobile = window.innerWidth < 600;
    this.dateService.setCurrentLang(localStorage.getItem('language'));
    this.authService.currentUser.subscribe((user: User) => {
      this.headerLinkList = [{routerLink: 'home', text: 'Home'}];
      this.user = user;
      if (this.user.type === 'user') {
        this.settingsVisible = true;
        this.headerLinkList.push({routerLink: 'projects', text: 'Projects'});
        this.headerLinkList.push({routerLink: 'indicators', text: 'CrossCuttingIndicators'});

        if (this.user.role !== 'admin') {
          this.settingsVisible = false;
        }
      }
      else {
        this.settingsVisible = false;
        this.headerLinkList.push({routerLink: `/projects/${this.user.projectId}`, text: 'Project'});
      }
    });
  }

  getLangs(): string[]{
    return this.translateService.getLangs();
  }

  switchLang(lang: string): void{
    this.translateService.use(lang);
    localStorage.setItem('language', lang);
    this.dateService.setCurrentLang(lang);
  }

  disconnect(): void{
    this.authService.logOut()
      .then( response => {
        if (response){
          this.route.navigate(['/login']);
        }
      });
  }
}
