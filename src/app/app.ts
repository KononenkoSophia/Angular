import { Component } from '@angular/core';
import { CoursesManagerPage } from './courses-manager/courses-manager';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoursesManagerPage],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'reactive-search-app';
}
