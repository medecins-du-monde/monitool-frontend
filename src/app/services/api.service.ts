import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
// TODO: Check why the method getHeaders doesn t do anything
  constructor(private http: HttpClient) { }

  get(path: string, options?: any): Promise<ArrayBuffer> {
    const url = this.getRequestUrl(path);
    const headers = this.getHeaders();
    if (headers) {
      options ? options.headers = headers : options = headers;
    }
    return this.http.get(url, options).toPromise();
  }

  post(path: string, body?: any, options?: any): Promise<ArrayBuffer> {
    const url = this.getRequestUrl(path);
    const headers = this.getHeaders();
    if (headers) {
      options ? options.headers = headers : options = headers;
    }
    return this.http.post(url, body, options).toPromise();
  }

  delete(path: string, options?: any): Promise<ArrayBuffer> {
    const url = this.getRequestUrl(path);
    const headers = this.getHeaders();
    if (headers) {
      options ? options.headers = headers : options = headers;
    }
    return this.http.delete(url, options).toPromise();
  }

  put(path: string, body?: any, options?: any): Promise<ArrayBuffer> {
    const url = this.getRequestUrl(path);
    const headers = this.getHeaders();
    if (headers) {
      options ? options.headers = headers : options = headers;
    }
    console.log(body);
    return this.http.put(url, body, options).toPromise();
  }

  patch(path: string, body?: any, options?: any): Promise<ArrayBuffer> {
    const url = this.getRequestUrl(path);
    const headers = this.getHeaders();
    if (headers) {
      options ? options.headers = headers : options = headers;
    }
    return this.http.patch(url, body, options).toPromise();
  }


  private getRequestUrl(path: string): string {
    return environment.API_URL + path;
  }

  private getHeaders(): HttpHeaders {
    // const token = localStorage.getItem(AUTH_TOKEN);
    // if (token) {
    //   return new HttpHeaders().set('Authorization', `JWT ${token}`);
    // }
    return null;
  }

}
