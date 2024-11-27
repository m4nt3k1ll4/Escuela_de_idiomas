import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8000/api/students';

  getHeader(token:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token });
    return  { 'headers' : headers};
  }

  constructor(private http: HttpClient) { }

  getStudent(token:any): Observable<any> {
    const headers = this.getHeader(token);
    return this.http.get<any>(this.apiUrl, headers);
  }

  createStudent(student: any, token: any): Observable<any> {
    const headers = this.getHeader(token);
    return this.http.post<any>(this.apiUrl, student, headers);
  }
  deleteStudent(id: number,token: any) {
    const headers = this.getHeader(token);
    const url = this.apiUrl + '/' + id;
    return this.http.delete<any>(url, headers);
  }

  updateStudent(student: any, id?: number, token?: any) {
    const headers = this.getHeader(token);
    const url = this.apiUrl + '/' + id;
    return this.http.put(url, student,headers);
  }
}

