import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(
    private http: HttpClient
    ) {
    }

 getProjects() {
  return this.http.get<Array<any>>('api/resources/project?mode=short');
}

}
