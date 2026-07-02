export interface CreateTransactionRequest {
  type: 'entrada' | 'saida';
  description: string;
  category: string;
  value: number;
  paymentMethod: string;
  transactionDate: string;
}