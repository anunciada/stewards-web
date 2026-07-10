import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../infrastructure/service/category.service';
import { CashFlowService } from '../../../infrastructure/service/cash-flow.service';
import { CreateTransactionRequest } from '../../../infrastructure/models/create-transaction-request.model';
import { CategoryRequest } from '../../../infrastructure/models/category-request.model';

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
  availableCategories: string[] = [];
  newCategory = '';

  ngOnInit() {
    this.getCategory(this.group.id);
  }

  showCreateCategory() {
    this.isCreatingCategory = true;
  }

  cancelCreateCategory() {
    this.isCreatingCategory = false;
    this.newCategory = '';
  }

  getCategory(groupId: string) {
    this.categoryService.getAllCategories(groupId)
      .subscribe(data => {
        this.categories = data;
        this.availableCategories = data.map(item => item.name);
      });
  }

  saveCategory() {
    const payload: CategoryRequest = {
      name: this.newCategory,
      groupId: this.group.id
    };

    this.categoryService.createCategory(payload)
      .subscribe({
        next: () => {
          this.availableCategories.push(this.newCategory);

          this.newCategory = '';
          this.isCreatingCategory = false;

        },
        error: (error) => {
          console.error(error);
        }
      });
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
