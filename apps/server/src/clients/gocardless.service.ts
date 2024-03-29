import { Inject, Injectable } from '@nestjs/common';
import NordigenClient from 'nordigen-node';
import goCardlessConfig from '../configuration/go-cardless.config';
import { ConfigType } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class GocardlessService {
  client: NordigenClient;
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
    const requisition: ReturnType<
      NordigenClient['requisition']['createRequisition']
    > = await this.client.initSession({
      redirectUrl: 'http://localhost:4200/connect',
      institutionId: 'MONZO_MONZGB2L',
      referenceId: randomUUID(),
      accessValidForDays: 1,
      accountSelection: false,
      maxHistoricalDays: 730,
      redirectImmediate: false,
      userLanguage: 'EN',
      ssn: null,
    });
    console.log(requisition);
    return requisition;
  }
}
