import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/classes/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public displayInfoPanel: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public userList: BehaviorSubject<User[]> = new BehaviorSubject([]);

  get isInfoPanelOpened(): Observable<boolean> {
    return this.displayInfoPanel.asObservable();
  }

  constructor(private apiService: ApiService, private translateService: TranslateService) {
    this.list();
  }

  public async list(): Promise<User[]> {
    const response: any = await this.apiService.get('/resources/user');
    const formattedResponse = (response.map(x => new User(x)) as User[])
    .sort((x: User, y: User) => x.name.toLocaleLowerCase().localeCompare(y.name.toLocaleLowerCase()));
    this.userList.next(formattedResponse);
    return formattedResponse;
  }

  public async save(user: User): Promise<void> {
    await this.apiService.put(`/resources/user/${user.id}`, user.serialize());
  }

  public closeInfoPanel(showing: boolean): void {
    this.displayInfoPanel.next(showing);
  }

  public async exportUsers(): Promise<void> {
    const file = await this.apiService.get('/export/users', {
      params: {
        lang: this.translateService.currentLang || 'en'
      },
      responseType: 'blob'
    });

    // save file to the user's computer
    const blob = new Blob([file], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    const usersText = this.translateService.instant('Users');
    a.download = `${usersText.toLocaleLowerCase()}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
