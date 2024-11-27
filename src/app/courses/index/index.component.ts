import { Course } from './../../model/course.model';
import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CourseService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  showForm: boolean = false;
  array: Course[] = [];
  token: string | null = null;
  myForm!: FormGroup;
  constructor(private router: Router, private courseService: CourseService, private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.router.navigate(['/home/body']);
    } else {
      this.getCourse();
    }
  }
  initForm(
    id?: number,
    name?: string,
    level_id?: number
  ) {
    this.myForm = this.formBuilder.group({
      id: [id],
      name: [name],
      level_id: [level_id]
    });
  }
  cancel() {
    this.showForm = false;
  }
  getCourse() {
    this.courseService.getCourse(this.token).subscribe(data => {
      this.array = data;
      this.showForm = false;
      console.log(data);
    }, err => {
      console.log(err);
    }
    );
  }

  formSubmitCourse(form: FormGroup): void {
    const course = new Course(form.value.name, form.value.level_id)
    if (form.value.id) {
      this.courseService.updateCourse(course, form.value.id, this.token).subscribe(data => {
        this.getCourse();
        console.log(data);
      });
    } else {
      this.courseService.createCourse(course, this.token).subscribe(data => {
        this.getCourse();
        console.log(data);
      });
    }
  }
  deleteCourse(id: number = 0): void {
    this.courseService.deleteCourse(id, this.token).subscribe(data => {
      this.getCourse();
    }, err => {
      console.log(err);
    });
  }
  updateCourse(course: Course) {
    this.initForm(course.id, course.name, course.level_id);
    this.showForm = true;
  }
  initCourse() {
    this.showForm = true;
    this.initForm();
  }
}
