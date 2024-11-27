import { Injectable } from '@angular/core';
import { Course } from '../model/course.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiUrl = 'http://127.0.0.1:8000/api/courses'

  getHeader(token:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token });
    return  { 'headers' : headers};
  }
  constructor(private http: HttpClient) { }

  getCourse(token:any): Observable<any> {
    const headers = this.getHeader(token);
    return this.http.get<any>(this.apiUrl, headers);
  }

  createCourse(course: any, token: any): Observable<any> {
    const headers = this.getHeader(token);
    return this.http.post<any>(this.apiUrl, course, headers);
  }

  deleteCourse(id: number, token: any) {
    const headers = this.getHeader(token);
    const url = this.apiUrl + '/' + id;
    return this.http.delete<any>(url,headers);
  }

  updateCourse(course: Course, id?: number, token?: any) {
    const headers = this.getHeader(token);
    const url = this.apiUrl + '/' + id;
    return this.http.put<Course>(url, course, headers);
  }
}
