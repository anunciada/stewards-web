export interface CreateTransactionRequest {
  type: 'entrada' | 'saida';
  category: string;
  description: string;
  value: number | null;
  date: string;
  paymentMethod: string;
}