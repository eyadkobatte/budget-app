export class Transaction {
  id!: string;
  accountId!: string;
  date!: Date;
  payee!: string;
  amount!: number;
  cleared!: boolean;
  category?: string;
  reconciled!: boolean;
}
