import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  public async list() {
    const response: any = await this.apiService.get('/resources/user');
    return response.map(x => new User(x));
  }

  public async save(user: User) {
    await this.apiService.put(`/resources/user/${user.id}`, user.serialize());
  }

}
