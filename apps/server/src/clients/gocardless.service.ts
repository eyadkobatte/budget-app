import { Inject, Injectable } from '@nestjs/common';
import NordigenClient from 'nordigen-node';
import goCardlessConfig from '../configuration/go-cardless.config';
import { ConfigType } from '@nestjs/config';
import { DateTime } from 'luxon';

type GetTransactions = {
  transactions: {
    booked: Array<SingleTransaction>;
    pending: Array<SingleTransaction>;
  };
};

type SingleTransaction = {
  additionalInformation: string;
  bookingDate: string;
  creditorAccount?: { bban?: string };
  creditorName?: string;
  transactionId: string;
  bookingDateTime: string;
  transactionAmount: { amount: string; currency: string };
  debtorName?: string;
  debtorAccount?: { bban?: string };
  currencyExchange?: {
    sourceCurrency: string;
    exchangeRate: string;
    targetCurrency: string;
  };
  remittanceInformationUnstructured: string;
  proprietaryBankTransactionCode: string;
  internalTransactionId: string;
};

@Injectable()
export class GocardlessService {
  private client: NordigenClient;
  constructor(
    @Inject(goCardlessConfig.KEY)
    private goCardlessConfiguration: ConfigType<typeof goCardlessConfig>
  ) {
    this.client = new NordigenClient({
      secretId: this.goCardlessConfiguration.secretId,
      secretKey: this.goCardlessConfiguration.secretKey,
      baseUrl: this.goCardlessConfiguration.baseUrl,
    });
  }
  async setupBank() {
    await this.client.generateToken();
    const response = await this.client.requisition.getRequisitions();
    console.dir(response, { depth: null });
    return response;
  }

  async getBankTransactionsPerAccount(
    accountId: string
  ): Promise<GetTransactions> {
    await this.client.generateToken();
    const dateFrom = DateTime.now().startOf('month').toFormat('y-LL-dd');
    const dateTo = DateTime.now().toFormat('y-LL-dd');
    const transactions = await this.client.account(accountId).getTransactions({
      country: 'GB',
      dateFrom,
      dateTo,
    });
    console.log({
      message: 'Fetched Transactions',
      accountId,
      dateFrom,
      dateTo,
      transactions: transactions,
    });
    return transactions;
  }
}
