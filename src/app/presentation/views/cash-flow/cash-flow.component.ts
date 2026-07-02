import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionModalComponent } from '../../shared/components/transaction-modal/transaction-modal.component';
import { DateService } from '../../../infrastructure/service/date.service';

@Component({
  selector: 'app-cash-flow',
  standalone: true,
  imports: [CommonModule, FormsModule, TransactionModalComponent],
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

  isTransactionModalOpen = false;

  openTransactionModal() {
    this.isTransactionModalOpen = true;
  }

  closeTransactionModal() {
    this.isTransactionModalOpen = false;
  }

  // DATE FILTER
  availableMonths: string[] = [];
  selectedYear = '26';

  constructor(private dateService: DateService) { }

  ngOnInit() {
    this.updateMonths();
  }

  updateMonths() {
    this.availableMonths =
      this.dateService.getAvailableMonths(this.selectedYear);
  }

}
