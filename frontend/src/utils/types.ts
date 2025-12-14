export interface Sale {
  transactionId: number;
  date: string;
  customerId: string;
  customerName: string;
  phone: string;
  gender: string;
  age: number;
  region: string;
  category: string;
  tags: string;
  paymentMethod: string;
  amount: number;
}

export type Filters = {
  region: string[];
  gender: string[];
  category: string[];
  paymentMethod: string[];
};
