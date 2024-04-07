import { Transaction } from '@entities/transaction';
import { GocardlessService } from '../../clients/gocardless.service';
import { DateTime } from 'luxon';

export class TransactionFormatter {
  private formatSingleTransaction(
    transaction: Awaited<
      ReturnType<GocardlessService['getBankTransactionsPerAccount']>
    >['transactions']['booked'][number],
    accountId: string,
    status: string
  ): Transaction {
    let rawPayee = '';

    const amount = Number.parseFloat(transaction.transactionAmount.amount);
    if (amount >= 0) {
      rawPayee =
        transaction.debtorName || transaction.remittanceInformationUnstructured;
    } else {
      rawPayee =
        transaction.creditorName ||
        transaction.remittanceInformationUnstructured;
    }

    const formattedTransaction: Transaction = {
      id: transaction.transactionId,
      accountId,
      date: DateTime.fromISO(transaction.bookingDateTime).toJSDate(),
      amount: Number.parseFloat(transaction.transactionAmount.amount),
      payee: rawPayee,
      cleared: status === 'booked',
      reconciled: false,
    };
    return formattedTransaction;
  }

  fromBankTransactionsToTransactions(
    transaction: Awaited<
      ReturnType<GocardlessService['getBankTransactionsPerAccount']>
    >,
    accountId: string
  ): Transaction[] {
    const bookedTransactions: Transaction[] =
      transaction.transactions.booked.map((transaction) =>
        this.formatSingleTransaction(transaction, accountId, 'booked')
      );
    const pendingTransactions: Transaction[] =
      transaction.transactions.pending.map((transaction) =>
        this.formatSingleTransaction(transaction, accountId, 'pending')
      );
    return [...bookedTransactions, ...pendingTransactions];
  }
}
