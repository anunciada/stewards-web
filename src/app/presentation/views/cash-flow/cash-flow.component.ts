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
    const now = new Date();
    const currentYear = now.getFullYear().toString().slice(-2);
    const currentMonth = now.getMonth();

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
}
