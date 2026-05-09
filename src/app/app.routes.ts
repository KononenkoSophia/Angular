import { Routes } from '@angular/router';
import { CoursesFilterPage } from './courses-filter/courses-filter';
import { CoursesHttpPage } from './courses-http/courses-http.page';

export const routes: Routes = [
  { path: 'local', component: CoursesFilterPage },
  { path: 'http', component: CoursesHttpPage },
  { path: '', redirectTo: 'http', pathMatch: 'full' },
  { path: '**', redirectTo: 'http' }
];
