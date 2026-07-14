export interface CreateTransactionRequest {
  groupId: string;
  categoryId: string;
  description: string;
  type: string;
  paymentMethod: string;
  value: number | null;
  transactionDate: string;
}