const {createApiPath} = require(`${process.cwd()}/utils`);

const testOptions = {
  currency: 'USD',
  today: false,
  yesterday: false,
  start: null,
  end: null
};

test('creating api path for today', () => {
  //api path
  expect(createApiPath(testOptions).apiPath).toBe('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
  expect(createApiPath().apiPath).toBe('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
  expect(createApiPath(Object.assign({},testOptions, {today: true})).apiPath).toBe('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
  expect(createApiPath(Object.assign({},testOptions, {currency: 'UAH'})).apiPath).toBe('https://api.coindesk.com/v1/bpi/currentprice/UAH.json');
  //types
  expect(createApiPath(testOptions).type).toBe('today');
  expect(createApiPath().type).toBe('today');
  expect(createApiPath(Object.assign({},testOptions, {today: true})).type).toBe('today');
  expect(createApiPath(Object.assign({},testOptions, {currency: 'UAH'})).type).toBe('today');
  //currency
  expect(createApiPath(testOptions).currency).toBe('USD');
  expect(createApiPath().currency).toBe('USD');
  expect(createApiPath(Object.assign({},testOptions, {today: true})).currency).toBe('USD');
  expect(createApiPath(Object.assign({},testOptions, {currency: 'UAH'})).currency).toBe('UAH');
});

test('creating api path for yesterday', () => {
  //apipath
  expect(createApiPath(Object.assign({},testOptions, {yesterday: true, currency: 'UAH'})).apiPath).toBe('https://api.coindesk.com/v1/bpi/historical/close.json?currency=UAH&for=yesterday');
  expect(createApiPath(Object.assign({},testOptions, {yesterday: true})).apiPath).toBe('https://api.coindesk.com/v1/bpi/historical/close.json?currency=USD&for=yesterday');
  //types
  expect(createApiPath(Object.assign({},testOptions, {yesterday: true, currency: 'UAH'})).type).toBe('yesterday');
  expect(createApiPath(Object.assign({},testOptions, {yesterday: true})).type).toBe('yesterday');
  //currency
  expect(createApiPath(Object.assign({},testOptions, {yesterday: true, currency: 'UAH'})).currency).toBe('UAH');
  expect(createApiPath(Object.assign({},testOptions, {yesterday: true})).currency).toBe('USD');  
});

test('creating api path for period', () => {
  //apipath
  expect(createApiPath(Object.assign({},testOptions, {start: '2017-01-01', end: '2017-01-03'})).apiPath).toBe('https://api.coindesk.com/v1/bpi/historical/close.json?currency=USD&start=2017-01-01&end=2017-01-03');
  expect(createApiPath(Object.assign({},testOptions, {start: '2017-01-01', end: '2017-01-03', currency: 'UAH'})).apiPath).toBe('https://api.coindesk.com/v1/bpi/historical/close.json?currency=UAH&start=2017-01-01&end=2017-01-03');
  //types
  expect(createApiPath(Object.assign({},testOptions, {start: '2017-01-01', end: '2017-01-03', currency: 'UAH'})).type).toBe('period');
  expect(createApiPath(Object.assign({},testOptions, {start: '2017-01-01', end: '2017-01-03'})).type).toBe('period');
  //currency
  expect(createApiPath(Object.assign({},testOptions, {start: '2017-01-01', end: '2017-01-03', currency: 'UAH'})).currency).toBe('UAH');
  expect(createApiPath(Object.assign({},testOptions, {start: '2017-01-01', end: '2017-01-03'})).currency).toBe('USD');
});
