import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionModalComponent } from '../../shared/transaction-modal/transaction-modal.component';
import { CashFlowFilterService } from '../../../infrastructure/service/cash-flow-filter.service';
import { CashFlowService } from '../../../infrastructure/service/cash-flow.service';
import { CashFlowFilters, CashFlowHeaderComponent } from '../../shared/cash-flow-header/cash-flow-header.component';
import { ExcelModalComponent } from '../../shared/excel-modal/excel-modal.component';

@Component({
  selector: 'app-cash-flow',
  standalone: true,
  imports: [CommonModule, FormsModule, TransactionModalComponent, CashFlowHeaderComponent, ExcelModalComponent],
  templateUrl: './cash-flow.component.html',
  styleUrl: './cash-flow.component.css'
})
export class CashFlowComponent {
  userName = 'mcu';

  currentBalance = 0;
  totalIncome = 0;
  totalOutcome = 0;

  currentFilters!: CashFlowFilters;

  constructor(
    private cashFlowFilterService: CashFlowFilterService,
    private cashFlowService: CashFlowService
  ) { }

  group: any = {
    name: "UMP",
    id: "84c40045-fa0a-4f2c-a8be-511586051dce"
  };

  ngOnInit() {
    this.getTransactions(this.group.id);
  }

  // DYNAMIC FILTER
  selectedFilter: 'todas' | 'entradas' | 'saidas' = 'todas';
  isTransactionModalOpen = false;


  select(filter: typeof this.selectedFilter) {
    this.selectedFilter = filter;

    if (this.currentFilters) {
      this.applyFilters(this.currentFilters);
    }
  }

  isActive(filter: typeof this.selectedFilter) {
    return this.selectedFilter === filter;
  }

  openTransactionModal() {
    this.isTransactionModalOpen = true;
  }

  closeTransactionModal() {
    this.isTransactionModalOpen = false;
  }

  // DATE FILTER
  availableMonths: string[] = [];

  applyFilters(filters: CashFlowFilters) {

    this.currentFilters = filters;

    let result =
      this.cashFlowFilterService.filterTransactions(
        this.transactions,
        filters.period,
        filters.month,
        filters.year
      );

    if (this.selectedFilter === 'entradas') {
      result = result.filter(
        t => t.type === 'entrada'
      );
    }

    if (this.selectedFilter === 'saidas') {
      result = result.filter(
        t => t.type === 'saida'
      );
    }

    this.filteredTransactions = result;

    this.totalIncome =
      result
        .filter(t => t.type === 'entrada')
        .reduce((sum, t) => sum + t.value, 0);

    this.totalOutcome =
      result
        .filter(t => t.type === 'saida')
        .reduce((sum, t) => sum + t.value, 0);

    this.currentBalance =
      this.totalIncome - this.totalOutcome;
  }

  transactions: any[] = [];
  filteredTransactions: any[] = [];

  getTransactions(groupId: string): void {
    this.cashFlowService.getAllTransactions(groupId)
      .subscribe(data => {
        this.transactions = data;
        this.filteredTransactions = [...data];
      });
  }

  // EXCEL MODAL
  isExcelModalOpen = false;

  openExcelModal() {
    this.isExcelModalOpen = true;
  }

  closeExcelModal() {
    this.isExcelModalOpen = false;
  }
}
