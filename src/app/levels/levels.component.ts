import { Level } from '../model/level.model';
import { Component } from '@angular/core';
import { LevelService } from '../services/level.service';
import { CommonModule,NgFor } from '@angular/common';
import { Route, Router } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-levels',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LevelService],
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss'
})
export class LevelsComponent {
  showForm: boolean = false;
  array: Level[] = [];
  token: string | null= null;
  myForm!: FormGroup;
  constructor(private router: Router, private levelService: LevelService, private formBuilder: FormBuilder) {
    this.initForm();
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if (this.token==null) {
      this.router.navigate(['home/body'])
    }else{
    this.getLevel();
    }
  }
  initForm(
    id?: number,
    name?: string,
    language_id?: number
  ) {
    this.myForm = this.formBuilder.group({
      id: [id],
      name: [name],
      language_id: [language_id]
    });
  }
  cancel() {
    this.showForm = false
  }
  getLevel() {
    this.levelService.getLevel(this.token).subscribe(data => {
      this.array = data.levels;
      this.showForm = false;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }

  formSubmitLevel(form: FormGroup) {
    const level = new Level(form.value.name, form.value.language_id,)
    if (form.value.id) {
      this.levelService.updateLevel(level,form.value.id, this.token).subscribe(data => {
        this.getLevel();
        console.log(data);
      });
    } else {
      this.levelService.createLevel(level,this.token).subscribe(data => {
        this.getLevel();
        console.log(data);
      });
    }
  }


  deleteLevel(id: number = 0): void {
    this.levelService.deleteLevel(id,this.token).subscribe(data => {
      this.getLevel();
    }, err => {
      console.log(err);
    });
  }

  updateLevel(level: Level) {
    this.initForm(level.id, level.name, level.language_id);
    this.showForm = true;
  }

  initLevel() {
    this.showForm = true;
    this.initForm();
  }
}
