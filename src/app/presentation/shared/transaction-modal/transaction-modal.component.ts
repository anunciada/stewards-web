import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../infrastructure/service/category.service';
import { CashFlowService } from '../../../infrastructure/service/cash-flow.service';
import { CreateTransactionRequest } from '../../../infrastructure/models/create-transaction-request.model';
import { CategoryRequest } from '../../../infrastructure/models/category-request.model';
import { CategoryDropdownComponent } from '../category-dropdown/category-dropdown.component';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, CategoryDropdownComponent],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.css'
})
export class TransactionModalComponent {
  @Output()
  close = new EventEmitter<void>();

  ngOnInit() {
    this.getCategory(this.group.id);
  }

  constructor(
    private categoryService: CategoryService,
    private cashFlowService: CashFlowService
  ) { }

  closeTransactionModal() {
    this.close.emit();
  }

  group: any = {
    name: "UMP",
    id: "84c40045-fa0a-4f2c-a8be-511586051dce"
  };

  // TYPE FILTER
  selectedTransactionType: 'entrada' | 'saida' = 'entrada';

  selectTransactionType(type: 'entrada' | 'saida') {
    this.selectedTransactionType = type;
  }

  isTransactionTypeSelected(type: 'entrada' | 'saida') {
    return this.selectedTransactionType === type;
  }

  // CATEGORY
  isCreatingCategory = false;
  categories: any[] = [];
  newCategory = '';

  showCreateCategory() {
    this.isCreatingCategory = true;
  }

  cancelCreateCategory() {
    this.isCreatingCategory = false;
    this.newCategory = '';
    this.editingCategoryId = null;
  }

  getCategory(groupId: string) {
    this.categoryService.getAllCategories(groupId)
      .subscribe(data => {
        this.categories = data;
      });
  }

  saveCategory() {
    const payload: CategoryRequest = {
      name: this.newCategory,
      groupId: this.group.id
    };

    if (this.editingCategoryId) {
      this.updateCategory(payload);
      return;
    }

    this.categoryService
      .createCategory(payload)
      .subscribe({
        next: () => {
          this.getCategory(this.group.id);
          this.resetCategoryForm();
        },
        error: error => console.error(error)
      });
  }

  updateCategory(payload: CategoryRequest) {
    if (!this.editingCategoryId) {
      return;
    }

    this.categoryService
      .updateCategory(this.editingCategoryId, payload)
      .subscribe({
        next: () => {
          const category = this.categories.find(
            c => c.id === this.editingCategoryId
          );

          if (category) {
            category.name = this.newCategory;
          }
          this.resetCategoryForm();
        },
        error: error => console.error(error)
      });
  }

  editingCategoryId: string | null = null;

  editCategory(category: any) {
    this.editingCategoryId = category.id;
    this.newCategory = category.name;
    this.isCreatingCategory = true;
  }

  selectCategory(category: any) {
    this.selectedCategory = category.name;
  }

  resetCategoryForm() {
    this.newCategory = '';
    this.isCreatingCategory = false;
    this.editingCategoryId = null;
  }

  // PAYMENT METHOD
  selectedPaymentMethod: 'outro' | 'pix' | 'cartao' | 'dinheiro' = 'pix';

  selectPaymentMethod(
    method: 'outro' | 'pix' | 'cartao' | 'dinheiro'
  ) {
    this.selectedPaymentMethod = method;
  }

  // SAVE A NEW TRANSACION
  selectedCategory = '';
  description = '';
  value: number | null = null;
  date = '';
  maxDate = new Date().toISOString().split('T')[0];

  addTransaction() {

    const payload: CreateTransactionRequest = {
      type: this.selectedTransactionType,
      category: this.selectedCategory,
      description: this.description,
      value: this.value,
      date: this.date,
      paymentMethod: this.selectedPaymentMethod
    };

    this.cashFlowService.createTransaction(payload);

    this.closeTransactionModal();
  }

  canAddTransaction(): boolean {
    return !!(
      this.selectedCategory &&
      this.value &&
      this.date &&
      this.selectedPaymentMethod
    );
  }

}
