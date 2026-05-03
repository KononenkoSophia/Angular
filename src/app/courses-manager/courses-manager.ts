import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { TrainingCourse } from '../courses-page/course';
import { CoursesManagerService } from './courses-manager.service';

@Component({
  selector: 'app-courses-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses-manager.html',
  styleUrls: ['./courses-manager.css']
})
export class CoursesManagerPage implements OnInit {
  // Observable список курсів
  courses$!: Observable<TrainingCourse[]>;

  // Поля форми
  newTitle: string = '';
  newCategory: string = '';
  newDuration: string = '';

  // Стан форми
  showForm: boolean = false;

  constructor(private coursesManager: CoursesManagerService) {}

  ngOnInit(): void {
    // Отримуємо список як Observable з BehaviorSubject
    this.courses$ = this.coursesManager.courses$;
  }

  // Показати/сховати форму
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  // Додати новий курс
  addCourse(): void {
    if (!this.newTitle.trim() || !this.newCategory.trim() || !this.newDuration.trim()) {
      return;
    }

    this.coursesManager.addCourse({
      title: this.newTitle.trim(),
      category: this.newCategory.trim(),
      duration: this.newDuration.trim()
    });

    // Очистити форму
    this.newTitle = '';
    this.newCategory = '';
    this.newDuration = '';
    this.showForm = false;
  }

  // Видалити курс
  deleteCourse(id: number): void {
    this.coursesManager.deleteCourse(id);
  }
}
