import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateService } from '../../../infrastructure/service/date.service';

export interface CashFlowFilters {
  period: string;
  month: string;
  year: string;
}

@Component({
  selector: 'app-cash-flow-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cash-flow-header.component.html',
  styleUrl: './cash-flow-header.component.css'
})
export class CashFlowHeaderComponent {

  @Input()
  userName = '';

  @Output()
  filtersChanged = new EventEmitter<CashFlowFilters>();

  selectedPeriod = 'all';
  selectedMonth = '';
  selectedYear = '26';

  availableMonths: string[] = [];

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.updateMonths();
    this.applyFilters();
  }

  updateMonths() {
    this.availableMonths =
      this.dateService.getAvailableMonths(this.selectedYear);
  }

  onYearChange() {
    this.updateMonths();
    this.applyFilters();
  }

  applyFilters() {
    this.filtersChanged.emit({
      period: this.selectedPeriod,
      month: this.selectedMonth,
      year: this.selectedYear
    });
  }
}