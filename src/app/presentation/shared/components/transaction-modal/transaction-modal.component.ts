import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../infrastructure/service/category.service';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.css'
})
export class TransactionModalComponent {
  // OPEN MODAL
  isTransactionModalOpen = false;

  openTransactionModal() {
    this.isTransactionModalOpen = true;
  }

  closeTransactionModal() {
    this.isTransactionModalOpen = false;
  }

  // TYPE FILTER
  selectedTransactionType: 'entrada' | 'saida' = 'entrada';

  selectTransactionType(type: 'entrada' | 'saida') {
    this.selectedTransactionType = type;
  }

  isTransactionTypeSelected(type: 'entrada' | 'saida') {
    return this.selectedTransactionType === type;
  }

  // CATEGORY
  constructor(
    private categoryService: CategoryService
  ) { }

  isCreatingCategory = false;
  availableCategories: string[] = [];
  newCategory = '';

  ngOnInit() {
    this.availableCategories =
      this.categoryService.getAllCategories();
  }

  showCreateCategory() {
    this.isCreatingCategory = true;
  }

  cancelCreateCategory() {
    this.isCreatingCategory = false;
    this.newCategory = '';
  }

  saveCategory() {
    this.categoryService.createCategory(this.newCategory);

    this.availableCategories =
      this.categoryService.getAllCategories();

    this.newCategory = '';
    this.isCreatingCategory = false;
  }
}
