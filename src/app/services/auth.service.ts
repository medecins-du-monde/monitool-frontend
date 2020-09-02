import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public async isAuthenticated(): Promise<boolean> {
    let response = false;

    await this.http.get(`${API_URL}/resources/myself`).toPromise().then(result => {
       response = true;
      }).catch((err) => {
        response = false;
      });

    return response;
  }

  public validate(email, password) {
    return this.http.post(`${API_URL}/authentication/login-training/`, {username : email, password}, {responseType: 'text'});
  }
}
