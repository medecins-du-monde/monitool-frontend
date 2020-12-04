import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    private fb: FormBuilder
  ) { }

  logo = '../../assets/images/MDM-LOGO.png';

  partner = false;

  loginForm: FormGroup;
  wrongCredentials = false;

  training = true;
  config = {
    trainingLabel: null,
  };

  ngOnInit() {
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
    this.authService.validateAzure()
    .then(() => {
      this.router.navigate(['home']);
    });
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
