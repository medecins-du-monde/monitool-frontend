import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DateService} from 'src/app/services/date.service';
import { User } from 'src/app/models/classes/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isMobile: boolean;
  user: User;
  // Remove settings from header when a user is not an admin
  public settingsVisible = true;

  private subscription: Subscription = new Subscription();

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
    this.subscription.add(
      this.authService.currentUser.subscribe((user: User) => {
        this.headerLinkList = [{routerLink: 'home', text: 'Home'}];
        this.user = user;
        // If the user has an MDM account show projects and cross cutting indicators
        if (this.user.type === 'user') {
          this.settingsVisible = true;
          this.headerLinkList.push({routerLink: 'projects', text: 'Projects'});
          this.headerLinkList.push({routerLink: 'indicators', text: 'CrossCuttingIndicators'});
          // If this user is not an admin, hide the settings menu
          if (this.user.role !== 'admin') {
            this.settingsVisible = false;
          }
        }
        // It the user is a partner account, hide the settings menu and show only the project
        // where the partner account has been invited
        else {
          this.settingsVisible = false;
          this.headerLinkList.push({routerLink: `/projects/${this.user.projectId}`, text: 'Project'});
        }
      })
    );
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
          this.user = null;
          this.route.navigate(['/login']);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
