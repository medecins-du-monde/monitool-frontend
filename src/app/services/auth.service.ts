import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  public async isAuthenticated(): Promise<boolean> {
    let response = false;

    await this.apiService.get('/resources/myself')
      .then(() => {
        response = true;
      })
      .catch(() => {
        response = false;
      });
    return response;
  }

  public validate(email: string, password: string): Promise<ArrayBuffer> {
    return this.apiService.post('/authentication/login-training/', {username : email, password}, {responseType: 'text'});
  }

  public async logOut(){
    let response = false;
    await this.apiService.post('/authentication/logout', {}, {responseType: 'text'})
      .then(() => {
        response = true;
      })
      .catch(err => {
        console.log('An error occured');
        console.log(err);
        response = false;
      });
    return response;
  }
}
