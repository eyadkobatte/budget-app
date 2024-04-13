import { Inject, Injectable } from '@nestjs/common';
import NordigenClient from 'nordigen-node';
import goCardlessConfig from '../configuration/go-cardless.config';
import { ConfigType } from '@nestjs/config';
import { randomUUID } from 'crypto';

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
    // this.setupBank();
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
    const transactions = await this.client.account(accountId).getTransactions({
      country: 'GB',
      dateFrom: '2024-03-01',
      dateTo: '2024-04-09',
    });
    return transactions;
  }
}
