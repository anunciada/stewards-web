import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../infrastructure/service/category.service';
import { TransactionService } from '../../../../infrastructure/service/transaction.service';
import { CreateTransactionRequest } from '../../../../infrastructure/models/create-transaction-request';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.css'
})
export class TransactionModalComponent {
  @Output()
  close = new EventEmitter<void>();

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) { }

  closeTransactionModal() {
    this.close.emit();
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

    this.transactionService.createTransaction(payload);

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
