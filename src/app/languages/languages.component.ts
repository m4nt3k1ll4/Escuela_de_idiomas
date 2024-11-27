import { Language } from './../model/language.model';
import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { CommonModule, NgFor } from '@angular/common';
import { Route,Router } from '@angular/router';
import { FormGroup,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LanguageService],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss'
})
export default class LanguagesComponent {
showForm: boolean = false;
array: Language[] = [];
token: string | null= null;
myForm!: FormGroup;
  constructor(private router: Router, private languageService: LanguageService, private formBuilder: FormBuilder) {
    this.initForm();
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if (this.token==null) {
      this.router.navigate(['home/body'])
    }else{
    this.getLanguages();
    }
  }
  initForm(
    id?: number,
    name?: string) {
    this.myForm = this.formBuilder.group({
      id: [id],
      name: [name]
    });
  }



  cancel() {
  this.showForm=false;
  };
  getLanguages() {
    this.languageService.getLanguages(this.token).subscribe(data => {
    this.array = data.languages;
      this.showForm=false;
      console.log(data);
    }, err => {
      console.log(err);
    } );
  }

  formSubmitLanguage(form: FormGroup) {
    const language = new Language(form.value.name);
    if (form.value.id) {
      this.languageService.updateLanguage(language, form.value.id,this.token).subscribe(data => {
        this.getLanguages();
        console.log(data);
      });
    } else {
      this.languageService.createLanguage(language,this.token).subscribe(data => {
        this.getLanguages();
        console.log(data);
      });
    }
  }


  deleteLanguage(id: number = 0) {
    this.languageService.deleteLanguage(id,this.token).subscribe(data => {
      this.getLanguages();
    },err => {
      console.log(err);
    });
  }
  updateLanguage(language: Language) {
    this.initForm(language.id, language.name);
    this.showForm = true;
  }

  initLanguage() {
    this.showForm = true;
    this.initForm();
  }
}

