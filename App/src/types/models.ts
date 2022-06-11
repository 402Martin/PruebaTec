type User = {
  idDocument: number;
  password: string;
};
type Account = {
  amount: number;
  idDocument: Number;
  idCurrency: string;
};

type Currency = {
  idCurrency: number;
  Currency: string;
};

export { User, Account, Currency };
