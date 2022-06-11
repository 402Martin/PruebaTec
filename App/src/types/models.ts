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

export { User, Account, Currency };
