const {filters} = require(`${process.cwd()}/utils`);

test('test filtering commands' ,()=>{
    const {filterCommands} = filters;
    expect(filterCommands('# hdhhd qwe/qwe /start qewqe llleq 121 23           qweqw /currency=UAH')).toEqual(['/start','/currency=UAH']);
    expect(filterCommands(' qwee      qwe /yesterday /start=2017-04-12 /end=2018-05-05 qwe/currency     /currency')).toEqual(['/yesterday','/start=2017-04-12','/end=2018-05-05','/currency']);
    expect(filterCommands('# hjhj')).toEqual([]);
    expect(filterCommands()).toEqual([]);
});

test('test filtering currency, today, yesterday, period commands' ,()=>{
    const {checkCurrency, checkToday, checkYesterday, checkPeriod} = filters;
    //Currency
    expect(checkCurrency(['/currency', 'ewrwer/currency='])).toBe(false);
    expect(checkCurrency(['/currency', '/currency='])).toBe(true);
    //Today
    expect(checkToday(['/tod', 'ewrwer/today'])).toBe(false);
    expect(checkToday(['/todays', '/today'])).toBe(true);
    //Yesterday
    expect(checkYesterday(['/yest', 'ewrwer/yesterday'])).toBe(false);
    expect(checkYesterday(['/yesterdays', '/yesterday'])).toBe(true);
    //Period
    expect(checkPeriod(['/yest', 'ewrwer/yesterday', '/start=', 'ewrwer/start=', '/start', '/end'])).toBe(false);
    expect(checkPeriod(['/yest', 'ewrwer/yesterday', 'ewrwer/start=', '/start=', '/end='])).toBe(true);
});

test('test getting period, getting currency' ,()=>{
    const {getCurrency, getPeriod} = filters;
    //Currency
    expect(getPeriod(['/yest', 'ewrwer/yesterday', 'ewrwer/start=2017-05-12', '/start=2017-04-01','/end=2017-04-06'])).toEqual({start: '2017-04-01', end: '2017-04-06'});
    //Period
    expect(getCurrency(['/yest', 'ewrwer/currency', 'ewrwer/currency=2017-05-12', '/currency=USD'])).toBe('USD');
    expect(getCurrency(['/currency', 'ewrwer/currency', 'ewrwer/currency=2017-05-12', '/currency=UAH'])).toBe('UAH');
});
