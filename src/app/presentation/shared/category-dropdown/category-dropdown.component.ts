import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-dropdown.component.html'
})
export class CategoryDropdownComponent {

  @Input()
  categories: any[] = [];

  @Input()
  selectedCategory = '';

  @Output()
  selectCategory = new EventEmitter<any>();

  @Output()
  editCategory = new EventEmitter<any>();

  @Output()
  deleteCategory = new EventEmitter<any>();

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  select(category: any) {
    this.selectCategory.emit(category);
    this.isOpen = false;
  }

}