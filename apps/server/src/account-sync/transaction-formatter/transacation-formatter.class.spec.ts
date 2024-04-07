import { TransactionFormatter } from './transaction-formatter.class';

describe('NatwestFormatter', () => {
  let formatter: TransactionFormatter;

  beforeEach(() => {
    formatter = new TransactionFormatter();
  });

  it('should be defined', () => {
    expect(formatter).toBeDefined();
  });
});
