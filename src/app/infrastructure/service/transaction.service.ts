import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { CreateTransactionRequest } from '../models/create-transaction-request';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private mock: Transaction[] = [
    { id: 1, data: '2026-06-01', descricao: 'Oferta culto', tipo: 'ENTRADA', valor: 500, formaPagamento: 'PIX' },
    { id: 2, data: '2026-06-02', descricao: 'Luz', tipo: 'SAIDA', valor: 200, formaPagamento: 'DINHEIRO' },
    { id: 3, data: '2026-06-03', descricao: 'Dízimo', tipo: 'ENTRADA', valor: 1550, formaPagamento: 'CARTAO' }
  ];

  getAll(): Transaction[] {
    return this.mock;
  }

  createTransaction(payload: CreateTransactionRequest) {
    console.log('Enviando para backend', payload);
    // return this.httpClientWrapper.post(...);
  }

}
