import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private readonly months = [
    'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
    'jul', 'ago', 'set', 'out', 'nov', 'dez'
  ];

  getAvailableMonths(selectedYear: string): string[] {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const currentMonth = new Date().getMonth();

    if (selectedYear === currentYear) {
      return this.months.slice(0, currentMonth + 1);
    }

    return this.months;
  }

}