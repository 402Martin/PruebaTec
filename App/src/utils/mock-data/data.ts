import { Account, Currency, User } from '../../types';

const mockedUsers: User[] = [
  { idDocument: 50213110, password: 'user9' },
  { idDocument: 50213111, password: 'user0' },
  { idDocument: 50213112, password: 'user1' },
  { idDocument: 50213113, password: 'user2' },
  { idDocument: 50213114, password: 'user3' },
  { idDocument: 50213115, password: 'user4' },
  { idDocument: 50213116, password: 'user5' },
  { idDocument: 50213117, password: 'user6' },
  { idDocument: 50213118, password: 'user7' },
  { idDocument: 50213119, password: 'user8' },
];

const mockedCurrency: Currency[] = [
  { currency: 'U$S', idCurrency: 'Usd' },
  { currency: '$', idCurrency: 'Peso' },
  { currency: '€', idCurrency: 'Euro' },
];

const mockedAccounts: Account[] = [
  { currencyId: 1, userId: 1, amount: 100 },
  { currencyId: 1, userId: 2, amount: 120 },
  { currencyId: 1, userId: 3, amount: 10 },
  { currencyId: 1, userId: 4, amount: 1000 },
  { currencyId: 1, userId: 5, amount: 220 },
  { currencyId: 1, userId: 6, amount: 1300 },
  { currencyId: 1, userId: 7, amount: 100 },
  { currencyId: 2, userId: 7, amount: 120 },
  { currencyId: 2, userId: 8, amount: 100 },
  { currencyId: 2, userId: 9, amount: 100 },
  { currencyId: 2, userId: 1, amount: 100 },
  { currencyId: 2, userId: 2, amount: 100 },
  { currencyId: 2, userId: 3, amount: 100 },
  { currencyId: 2, userId: 4, amount: 100 },
];

const data = { mockedAccounts, mockedCurrency, mockedUsers };

export default data;
