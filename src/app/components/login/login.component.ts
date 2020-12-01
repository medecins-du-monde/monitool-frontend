import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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
    private router: Router,
    private fb: FormBuilder
  ) { }

  logo = '../../assets/images/MDM-LOGO.png';

  partner = false;

  loginForm: FormGroup;
  wrongCredentials = false;

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginTrainingAccount(){
    this.authService.validateTraining('value', 'value').then(() => {
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
    .catch(err => {
      this.wrongCredentials = true;
    });
  }

  partnerAccount(){
    this.partner = !this.partner;
  }
}
