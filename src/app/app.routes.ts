import { Routes } from '@angular/router';
import { IndexComponent } from './courses/index/index.component';
import { BodyComponent } from './home/body/body.component';
import { StudentsComponent } from './students/students.component';
import LanguagesComponent from './languages/languages.component';
import { LevelsComponent } from './levels/levels.component';
import { MainComponent } from './home/main/main.component';

export const routes: Routes = [
  { path: '', redirectTo:'home/body', pathMatch:'full'},
  { path: 'home/main', component: MainComponent},
  { path: 'students', component: StudentsComponent },
  { path: 'home/body', component: BodyComponent },
  { path: 'course/index', component: IndexComponent },
  { path: 'languages', component: LanguagesComponent },
  { path: 'levels', component: LevelsComponent }
];
