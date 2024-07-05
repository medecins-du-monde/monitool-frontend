import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private router: Router,
    private fb: FormBuilder,
    private azureService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) { }

  logo = '../../assets/images/MDM-LOGO.png';

  partner = false;

  loginForm: FormGroup;
  wrongCredentials = false;

  azureLoginSubscription: Subscription;

  training = true;
  config = {
    trainingLabel: null,
  };

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.configService.getConfig().then(result => {
      Object.assign(this.config, result);
    });
  }

  loginTrainingAccount(){
    this.authService.validateTraining('value', 'value').then(() => {
      this.router.navigate(['home']);
    });
  }

  loginAzure() {
    if (this.azureLoginSubscription) {
      this.azureLoginSubscription = this.msalBroadcastService.inProgress$
        .pipe(
          filter((status: InteractionStatus) => status === InteractionStatus.None),
        )
        .subscribe(() => {
          this.azureService.loginRedirect({scopes: ['user.read', 'openid', 'profile']});
          this.azureLoginSubscription.unsubscribe();
        });
    }
  }

  loginPartner(){
    this.authService.validatePartner(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value
    ).then(() => {
      this.router.navigate(['home']);
    })
    .catch(() => {
      this.wrongCredentials = true;
    });
  }
}
