import { Injectable } from '@angular/core';
import { Level } from '../model/level.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private apiUrl = 'http://127.0.0.1:8000/api/levels'
  getHeader(token: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return { 'headers': headers };
  }
  constructor(private http: HttpClient) { }

  getLevel(token: any): Observable<any> {
    const headers = this.getHeader(token);
    return this.http.get<any>(this.apiUrl, headers);
  }

  createLevel(level: any, token: any): Observable<any> {
    const headers = this.getHeader(token);
    return this.http.post<any>(this.apiUrl, level, headers);
  }

  deleteLevel(id: number, token: any) {
    const headers = this.getHeader(token);
    const url = this.apiUrl + '/' + id;
    return this.http.delete<any>(url, headers);
  }
  updateLevel(level: Level, id?: number, token?: any) {
    const headers = this.getHeader(token);
    const url = this.apiUrl + '/' + id;
    return this.http.put<Level>(url, level, headers);
  }

}
