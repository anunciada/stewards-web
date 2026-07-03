import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CashFlowFilterService {

  filterTransactions(
    transactions: any[],
    period: string,
    month: string,
    year: string
  ) {

    let filtered = [...transactions];

    if (period !== 'all') {

      const monthsBack = Number(period);

      const limitDate = new Date();
      limitDate.setMonth(limitDate.getMonth() - monthsBack);

      filtered = filtered.filter(t =>
        new Date(t.date) >= limitDate
      );
    }

    if (year) {
      filtered = filtered.filter(t =>
        new Date(t.date).getFullYear().toString().slice(-2) === year
      );
    }

    if (month) {
      filtered = filtered.filter(t =>
        new Date(t.date).getMonth() === Number(month)
      );
    }

    return filtered;
  }

}