import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TrainingCourse {
  id: number;
  title: string;
  category: string;
  duration: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  private readonly DB_COURSES: TrainingCourse[] = [
    { id: 1, title: 'JavaScript Advanced', category: 'Frontend', duration: '12 годин' },
    { id: 2, title: 'Управління базами даних MySQL', category: 'Database', duration: '8 годин' },
    { id: 3, title: 'Машинне навчання з Python', category: 'AI', duration: '25 годин' },
    { id: 4, title: 'Docker та CI/CD', category: 'DevOps', duration: '10 годин' },
    { id: 5, title: 'Основи кібербезпеки', category: 'Security', duration: '6 годин' }
  ];

  findCourses(keyword: string): Observable<TrainingCourse[]> {
    const safeKeyword = keyword.toLowerCase().trim();

    return timer(150).pipe(
      map(() => {
        if (!safeKeyword) return [...this.DB_COURSES];
        return this.DB_COURSES.filter(c => c.title.toLowerCase().includes(safeKeyword));
      })
    );
  }
}