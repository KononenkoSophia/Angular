import { Component } from '@angular/core';
import { CoursesFilterPage } from './courses-filter/courses-filter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoursesFilterPage],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'reactive-search-app';
}
