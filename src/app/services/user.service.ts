import { Injectable } from '@angular/core';
import { User } from '../models/classes/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  public async list(): Promise<User[]> {
    const response: any = await this.apiService.get('/resources/user');
    return (response.map(x => new User(x)) as User[]).sort((x: User, y: User) => x.name.localeCompare(y.name));
  }

  public async save(user: User): Promise<void> {
    await this.apiService.put(`/resources/user/${user.id}`, user.serialize());
  }

}
