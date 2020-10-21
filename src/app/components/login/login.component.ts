import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  logo = '../../assets/images/MDM-LOGO.png';

  ngOnInit() {
  }

  login(){
    this.authService.validate('value', 'value').then((response: any) => {
      this.router.navigate(['home']);
    });
  }
}
