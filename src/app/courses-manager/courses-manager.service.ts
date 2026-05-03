import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TrainingCourse } from '../courses-page/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesManagerService {
  // Стартові тестові дані (мінімум 3)
  private readonly initialCourses: TrainingCourse[] = [
    { id: 1, title: 'JavaScript Advanced', category: 'Frontend', duration: '12 годин' },
    { id: 2, title: 'Управління базами даних MySQL', category: 'Database', duration: '8 годин' },
    { id: 3, title: 'Машинне навчання з Python', category: 'AI', duration: '25 годин' },
    { id: 4, title: 'Docker та CI/CD', category: 'DevOps', duration: '10 годин' },
    { id: 5, title: 'Основи кібербезпеки', category: 'Security', duration: '6 годин' }
  ];

  // BehaviorSubject для зберігання списку курсів
  private coursesSubject = new BehaviorSubject<TrainingCourse[]>(this.initialCourses);

  // Observable для підписки в компоненті
  courses$: Observable<TrainingCourse[]> = this.coursesSubject.asObservable();

  // Отримати поточний список
  private getCurrentCourses(): TrainingCourse[] {
    return this.coursesSubject.getValue();
  }

  // Генерація унікального id
  private generateId(): number {
    const courses = this.getCurrentCourses();
    return courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
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

  // Видалення курсу за id
  deleteCourse(id: number): void {
    const updatedList = this.getCurrentCourses().filter(c => c.id !== id);
    this.coursesSubject.next(updatedList);
  }
}
