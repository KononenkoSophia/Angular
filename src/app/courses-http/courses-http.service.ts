import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, catchError, throwError } from 'rxjs';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CoursesHttpService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      delay(1000), // штучна затримка для демонстрації лоадера
      catchError((error) => {
        console.error('API Error:', error);
        return throwError(() => new Error('Не вдалося завантажити дані з сервера. Перевірте, чи запущено json-server.'));
      })
    );
  }
}
