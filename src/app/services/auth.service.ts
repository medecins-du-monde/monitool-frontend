import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/classes/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<User> = new BehaviorSubject(new User());

  get currentUser(): Observable<User> {
    return this.user.asObservable();
  }

  constructor(private apiService: ApiService) { }

  public async isAuthenticated(): Promise<boolean> {
    let gotResponse = false;

    await this.apiService.get('/resources/myself')
      .then((response) => {
        const currentUser = new User(response);
        delete currentUser.id;
        this.user.next(currentUser);
        gotResponse = true;
      })
      .catch(() => {
        gotResponse = false;
      });

    return gotResponse;
  }

  public async getCurrentUser(){
    return await this.apiService.get('/resources/myself');
  }

  public validateTraining(email: string, password: string): Promise<ArrayBuffer> {
    return this.apiService.post('/authentication/login-training/', {username : email, password}, {responseType: 'text'});
  }
  public validatePartner(email: string, password: string): Promise<ArrayBuffer> {
    return this.apiService.post('/authentication/login-partner', {username : email, password}, {responseType: 'text'});
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
