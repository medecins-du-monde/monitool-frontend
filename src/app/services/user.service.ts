import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  public async list() {
    const response = await this.apiService.get('/resources/user');
  }

  public async save(user: User) {
    const response = await this.apiService.put(`/resources/user/${user.id}`, user);
  }
}
