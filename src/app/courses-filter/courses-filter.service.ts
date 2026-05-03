import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TrainingCourse } from '../courses-page/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesFilterService {
  // Щонайменше 6 курсів, 3+ категорії
  private readonly initialCourses: TrainingCourse[] = [
    { id: 1, title: 'JavaScript Advanced', category: 'Frontend', duration: '12 годин' },
    { id: 2, title: 'React для початківців', category: 'Frontend', duration: '15 годин' },
    { id: 3, title: 'Angular у продакшені', category: 'Frontend', duration: '20 годин' },
    { id: 4, title: 'Управління базами даних MySQL', category: 'Database', duration: '8 годин' },
    { id: 5, title: 'PostgreSQL: просунутий рівень', category: 'Database', duration: '14 годин' },
    { id: 6, title: 'Машинне навчання з Python', category: 'AI', duration: '25 годин' },
    { id: 7, title: 'Deep Learning та нейромережі', category: 'AI', duration: '30 годин' },
    { id: 8, title: 'Docker та CI/CD', category: 'DevOps', duration: '10 годин' },
    { id: 9, title: 'Kubernetes для розробників', category: 'DevOps', duration: '18 годин' },
    { id: 10, title: 'Основи кібербезпеки', category: 'Security', duration: '6 годин' }
  ];

  // BehaviorSubject для реактивного списку
  private coursesSubject = new BehaviorSubject<TrainingCourse[]>(this.initialCourses);

  // Observable для підписки
  courses$: Observable<TrainingCourse[]> = this.coursesSubject.asObservable();

  // Отримати поточні курси
  private getCurrentCourses(): TrainingCourse[] {
    return this.coursesSubject.getValue();
  }

  // Генерація унікального id
  private generateId(): number {
    const courses = this.getCurrentCourses();
    return courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
  }

  // Отримати унікальні категорії
  getCategories(): string[] {
    return [...new Set(this.getCurrentCourses().map(c => c.category))];
  }

  // Додавання нового курсу
  addCourse(courseData: Omit<TrainingCourse, 'id'>): void {
    const newCourse: TrainingCourse = {
      id: this.generateId(),
      ...courseData
    };
    const updatedList = [...this.getCurrentCourses(), newCourse];
    this.coursesSubject.next(updatedList);
  }

  // Видалення курсу
  deleteCourse(id: number): void {
    const updatedList = this.getCurrentCourses().filter(c => c.id !== id);
    this.coursesSubject.next(updatedList);
  }
}
