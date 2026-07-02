import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cash-flow',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cash-flow.component.html',
  styleUrl: './cash-flow.component.css'
})
export class CashFlowComponent {
  userName = 'mcu';

  // DINAMIC FILTER
  selectedFilter: 'todas' | 'entradas' | 'saidas' = 'todas';

  select(filter: typeof this.selectedFilter) {
    this.selectedFilter = filter;
  }

  isActive(filter: typeof this.selectedFilter) {
    return this.selectedFilter === filter;
  }

  //DATES
  months = [
    'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
    'jul', 'ago', 'set', 'out', 'nov', 'dez'
  ];

  availableMonths: string[] = [];
  selectedYear = '26';

  ngOnInit() {
    this.updateMonths();
  }

  updateMonths() {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    // limita a 2 dígitos
    this.selectedYear = this.selectedYear.replace(/\D/g, '').slice(0, 2);

    // impede ano futuro
    if (+this.selectedYear > +currentYear) {
      this.selectedYear = currentYear;
    }

    const currentMonth = new Date().getMonth();

    if (this.selectedYear === currentYear) {
      this.availableMonths = this.months.slice(0, currentMonth + 1);
    } else {
      this.availableMonths = this.months;
    }
  }

  // NEW TRANSACTION MODAL
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  isCreatingCategory = false;

  availableCategories = [
    'Categoria 1',
    'Categoria 2',
    'Categoria 3'
  ];

  newCategory = '';

  showCreateCategory() {
    this.isCreatingCategory = true;
  }

  cancelCreateCategory() {
    this.isCreatingCategory = false;
    this.newCategory = '';
  }

  saveCategory() {
    if (!this.newCategory.trim()) {
      return;
    }

    this.availableCategories.push(this.newCategory);

    this.newCategory = '';
    this.isCreatingCategory = false;
  }
}
