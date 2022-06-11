type User = {
  idDocument: number;
  password: string;
};
type Account = {
  amount: number;
  userId: number;
  currencyId: number;
};

type Currency = {
  idCurrency: string;
  currency: string;
};

type Transaction = {
  originAccountId: number;
  destinationAccountId: number;
  amount: number;
  date: Date;
  description: string;
};

export { User, Account, Currency, Transaction };
