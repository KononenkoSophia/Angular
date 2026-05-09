import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of, BehaviorSubject, tap } from 'rxjs';
import { Course } from './course';
import { CoursesHttpService } from './courses-http.service';

@Component({
  selector: 'app-courses-http',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-http.page.html',
  styleUrls: ['./courses-http.page.css']
})
export class CoursesHttpPage implements OnInit {
  courses$ = new BehaviorSubject<Course[] | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  constructor(private httpService: CoursesHttpService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading$.next(true);
    this.error$.next(null);

    this.httpService.getCourses().subscribe({
      next: (data) => {
        this.courses$.next(data);
        this.loading$.next(false);
      },
      error: (err) => {
        this.error$.next(err.message);
        this.loading$.next(false);
      }
    });
  }
}
