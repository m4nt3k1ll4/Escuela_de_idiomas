import { Student } from './../model/student.model';
import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Course } from '../model/course.model';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StudentService],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  showForm: boolean = false;
  array: Student[] = [];
  token: string | null = null;
  myForm!: FormGroup;
  constructor(
    private router: Router,
    private studentService: StudentService,
    private formBuilder: FormBuilder){
    this.initForm();
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token==null) {
      this.router.navigate(['home/body']);
    } else {
      this.getStudent();
    }
  }
  initForm(
    id?: number,
    name?: string,
    email?: string,
    phone?: string,
    level_id?: number,
    courses?: Array<Course>
  ) {

    const ids = courses?.map(course => course.id).join(',');
    this.myForm = this.formBuilder.group({
      id: [id],
      name: [name],
      email: [email],
      phone: [phone],
      level_id: [level_id],
      courses: [ids]
    });
  }
  cancel() {
    this.showForm = false;
  }

  getStudent() {
    this.studentService.getStudent(this.token).subscribe(data => {
      this.array = data.students;
      this.showForm = false;
      console.log(data);
    }, err => {
      console.log(err);
    }
    );
  }

  formSubmitStudent(form: FormGroup): void {
    const courses = form.value.courses.split(",");
    const student = new Student(form.value.name, form.value.email, form.value.phone, form.value.level_id,courses,)
    if (form.value.id) {
      this.studentService.updateStudent(student, form.value.id, this.token).subscribe(data => {
        this.getStudent();
        console.log(data);
      });
    } else {
      this.studentService.createStudent(student, this.token).subscribe(data => {
        this.getStudent();
        console.log(data);
      });
    }
  }

  deleteStudent(id: number = 0): void {
    this.studentService.deleteStudent(id,this.token).subscribe(data => {
      this.getStudent();
    }, err => {
      console.log(err);
    });
  }
  updateStudent(student: Student) {
     this.initForm(student.id, student.name,student.email,student.phone, student.level_id,student.courses);
     this.showForm = true;
  }

  initStudent() {
    this.showForm = true;
    this.initForm();
  }

}
