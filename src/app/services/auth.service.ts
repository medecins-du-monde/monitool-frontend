import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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

  public validate(email, password) {
    return this.http.post(`${environment.API_URL}/authentication/login-training/`, {username : email, password}, {responseType: 'text'});
  }
}
