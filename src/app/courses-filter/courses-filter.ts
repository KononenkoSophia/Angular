import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TrainingCourse } from '../courses-page/course';
import { CoursesFilterService } from './courses-filter.service';

@Component({
  selector: 'app-courses-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses-filter.html',
  styleUrls: ['./courses-filter.css']
})
export class CoursesFilterPage implements OnInit {
  // Окремі потоки для пошуку та категорії
  private searchSubject = new BehaviorSubject<string>('');
  private categorySubject = new BehaviorSubject<string>('');

  // Результат комбінованої фільтрації
  filteredCourses$!: Observable<TrainingCourse[]>;

  // Список категорій для select
  categories: string[] = [];

  // Прив'язка до полів
  searchTerm: string = '';
  selectedCategory: string = '';

  // Форма додавання
  showForm: boolean = false;
  newTitle: string = '';
  newCategory: string = '';
  newDuration: string = '';

  constructor(private filterService: CoursesFilterService) {}

  ngOnInit(): void {
    this.categories = this.filterService.getCategories();

    // combineLatest — об'єднуємо потоки пошуку, категорії та список курсів
    this.filteredCourses$ = combineLatest([
      this.searchSubject.pipe(startWith('')),
      this.categorySubject.pipe(startWith('')),
      this.filterService.courses$
    ]).pipe(
      map(([search, category, courses]) => {
        // Оновити категорії при зміні списку
        this.categories = [...new Set(courses.map(c => c.category))];

        const searchLower = search.toLowerCase().trim();

        return courses.filter(course => {
          const matchesTitle = !searchLower || course.title.toLowerCase().includes(searchLower);
          const matchesCategory = !category || course.category === category;
          return matchesTitle && matchesCategory;
        });
      })
    );
  }

  // Оновити потік пошуку
  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  // Оновити потік категорії
  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.categorySubject.next(value);
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

    this.filterService.addCourse({
      title: this.newTitle.trim(),
      category: this.newCategory.trim(),
      duration: this.newDuration.trim()
    });

    this.newTitle = '';
    this.newCategory = '';
    this.newDuration = '';
    this.showForm = false;
  }

  // Видалити курс
  deleteCourse(id: number): void {
    this.filterService.deleteCourse(id);
  }
}
