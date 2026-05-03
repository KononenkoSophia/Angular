import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
// Додано startWith
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { CourseDataService, TrainingCourse } from './course';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses-page.html',
  styleUrls: ['./courses-page.css']
})
export class CoursesPage implements OnInit {
  searchTerm: string = '';
  private searchSubject = new Subject<string>();
  results$!: Observable<TrainingCourse[]>;

  constructor(private dataService: CourseDataService) { }

  ngOnInit(): void {
    this.results$ = this.searchSubject.pipe(
      startWith(''),
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(term => this.dataService.findCourses(term))
    );
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }
}