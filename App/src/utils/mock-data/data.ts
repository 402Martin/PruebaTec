const mockedUsers = [
  { idDocument: '50213110', password: 'user9' },
  { idDocument: '50213111', password: 'user0' },
  { idDocument: '50213112', password: 'user1' },
  { idDocument: '50213113', password: 'user2' },
  { idDocument: '50213114', password: 'user3' },
  { idDocument: '50213115', password: 'user4' },
  { idDocument: '50213116', password: 'user5' },
  { idDocument: '50213117', password: 'user6' },
  { idDocument: '50213118', password: 'user7' },
  { idDocument: '50213119', password: 'user8' },
];

const mockedCurrency = [
  { currency: 'U$S', idCurrency: 'Usd' },
  { currency: '$', idCurrency: 'Peso' },
  { currency: '€', idCurrency: 'Euro' },
];

const mockedAccounts = [
  { idCurrency: 'Usd', idDocument: '50213110', amount: 100 },
  { idCurrency: 'Usd', idDocument: '50213111', amount: 120 },
  { idCurrency: 'Usd', idDocument: '50213112', amount: 10 },
  { idCurrency: 'Usd', idDocument: '50213113', amount: 1000 },
  { idCurrency: 'Usd', idDocument: '50213114', amount: 220 },
  { idCurrency: 'Usd', idDocument: '50213115', amount: 1300 },
  { idCurrency: 'Usd', idDocument: '50213116', amount: 100 },
  { idCurrency: 'Peso', idDocument: '50213116', amount: 120 },
  { idCurrency: 'Peso', idDocument: '50213118', amount: 100 },
  { idCurrency: 'Peso', idDocument: '50213117', amount: 100 },
  { idCurrency: 'Peso', idDocument: '50213110', amount: 100 },
  { idCurrency: 'Peso', idDocument: '50213111', amount: 100 },
  { idCurrency: 'Peso', idDocument: '50213112', amount: 100 },
  { idCurrency: 'Peso', idDocument: '50213113', amount: 100 },
];

const data = { mockedAccounts, mockedCurrency, mockedUsers };

export default data;
