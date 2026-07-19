import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { CreateTransactionRequest } from '../models/create-transaction-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashFlowService {

  private readonly URL = 'http://localhost:8080/transaction';

  private mock: Transaction[] = [
    { id: 1, data: '2026-06-01', descricao: 'Oferta culto', tipo: 'ENTRADA', valor: 500, formaPagamento: 'PIX' },
    { id: 2, data: '2026-06-02', descricao: 'Luz', tipo: 'SAIDA', valor: 200, formaPagamento: 'DINHEIRO' },
    { id: 3, data: '2026-06-03', descricao: 'Dízimo', tipo: 'ENTRADA', valor: 1550, formaPagamento: 'CARTAO' }
  ];

  constructor(private http: HttpClient) { }

  getAll(): Transaction[] {
    return this.mock;
  }

  createTransaction(payload: CreateTransactionRequest): Observable<void> {
    return this.http.post<void>(
      this.URL,
      payload
    );
  }

  getAllTransactions(groupId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.URL}/${groupId}`
    );
  }
}
