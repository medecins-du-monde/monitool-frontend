import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public async isAuthenticated(): Promise<boolean> {
    let response = false;

    await this.http.get('/api/resources/myself').toPromise().then(result => {
       response = true;
      }).catch((err) => {
        response = false;
      });

    return response;
  }

  public validate(email, password) {
    return this.http.post('/api/authentication/login-training/', {username : email, password}, {responseType: 'text'});
  }
}
