import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../model/response.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://127.0.0.1:8000/api/'
  constructor(private http: HttpClient) { }

  register(name:any,email:any,password:any): Observable<any>{
    return this.http.post(this.url+"register", {name, email, password});
  }
  login(email: any, password: any): Observable<any> {
    return this.http.post(this.url+"login", {email, password});
  }

}
