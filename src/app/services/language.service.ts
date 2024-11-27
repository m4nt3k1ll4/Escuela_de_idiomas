import { Injectable } from '@angular/core';
import { Language } from '../model/language.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  apiUrl = 'http://127.0.0.1:8000/api/languages'
  getHeader(token: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return { 'headers': headers };
  }
  constructor(private http: HttpClient) { }

  getLanguages(token: any): Observable<any> {
    const headers = this.getHeader(token);
    return this.http.get<any>(this.apiUrl, headers);
  }

  createLanguage(language: any, token: any): Observable<any> {
    const headers = this.getHeader(token);
    return this.http.post<any>(this.apiUrl, language, headers);
  }

  deleteLanguage(id: number, token: any) {
    const headers = this.getHeader(token);
    const url = this.apiUrl + '/' + id;
    return this.http.delete<any>(url, headers);
  }

  updateLanguage(language: any, id?: number, token?: any) {
    const headers = this.getHeader(token);
    const url = this.apiUrl + '/' + id;
    return this.http.put<any>(url, language, headers);
  }
}
