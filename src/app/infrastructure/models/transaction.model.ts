export interface Transaction {
  id: number;
  data: string;
  descricao: string;
  tipo: 'ENTRADA' | 'SAIDA';
  valor: number;
  formaPagamento: 'PIX' | 'CARTAO' | 'DINHEIRO';
}