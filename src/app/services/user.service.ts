import { Injectable } from '@angular/core';
import { usersList } from '../mocked/users.mocked';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
// import { usersList } from '../modules/project/modules/structure/pages/users/constants/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  public async list() {
    // const response: any = await this.apiService.get('/resources/user');
    // const response = Users;
    const response = usersList;
    return response.map(x => new User(x));
  }

  public async save(user: User) {
    // const response = await this.apiService.put(`/resources/user/${user.id}`, user);
  }
}