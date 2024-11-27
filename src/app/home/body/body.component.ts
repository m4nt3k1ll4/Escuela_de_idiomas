import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Response } from '../../model/response.model';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BodyComponent {
  showForm: boolean =false;
  myForm!: FormGroup;
  authForm = this.formBuilder.group({
    email: '',
    password: ''
  })
  response: Response | null = null;
  token: string | null = null;
  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    this.initForm();
  }
  ngOnInit(): void{
    this.token = localStorage.getItem('token');
    if (this.token){
      this.router.navigate(['/home/main'])
    }
   }

  initForm(
    name?: string,
    email?: string,
    password?: string
  ){
    this.myForm = this.formBuilder.group({
      name: [name],
      email: [email],
      password: [password]
    });
  }
  initRegister(){
    this.showForm = true;
    this.initForm();
  }
  cancel(){
    this.showForm = false;
  }
  login(): void {
    this.authService.login(
      this.authForm.get('email')?.value,
      this.authForm.get('password')?.value
    ).subscribe(data => {
      this.response = data;
      if (this.response != null) {
        localStorage.setItem('token', this.response.token);
        window.location.reload();
      }
    },
      err => console.log(err)
    );
  }
  formSubmitRegister(form: FormGroup) {
    this.authService.register(
      this.myForm.get('name')?.value,
      this.myForm.get('email')?.value,
      this.myForm.get('password')?.value
    ).subscribe(data => {
      this.showForm = false;
    });
  }
}
