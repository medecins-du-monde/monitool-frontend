import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/classes/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public showInputWarningModal: BehaviorSubject<boolean> = new BehaviorSubject(true);

  get showingInputModal(): Observable<boolean> {
    return this.showInputWarningModal.asObservable();
  }

  constructor(private apiService: ApiService) { }

  public async list(): Promise<User[]> {
    const response: any = await this.apiService.get('/resources/user');
    return (response.map(x => new User(x)) as User[])
    .sort((x: User, y: User) => x.name.toLocaleLowerCase().localeCompare(y.name.toLocaleLowerCase()));
  }

  public async save(user: User): Promise<void> {
    await this.apiService.put(`/resources/user/${user.id}`, user.serialize());
  }

  public updateInputModalChoice(showing: boolean): void {
    this.showInputWarningModal.next(showing)
  }

}
