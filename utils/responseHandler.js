const moment = require('moment');
const rights = `\nThis data was produced from the CoinDesk Bitcoin Price Index.`;

const addRights = (message) => {
    return `${message}${rights}`;
}

module.exports.todayHandler = (body) => {
    const {res, currency_code} = body;
    const currency = res.bpi[`${currency_code}`];
    let response = `For today the bitcoin price is ${Math.round(currency.rate_float)} ${currency.code}.\n`;
    return addRights(response);
}

module.exports.yesterdayHandler = (body) => {
    const {res, currency_code} = body;
    const rate = Object.values(res.bpi)[0];
    let response = `For yesterday the bitcoin price was ${Math.round(rate)} ${currency_code}.\n`;
    return addRights(response);
}

module.exports.periodHandler = (body) => {
    const {res, currency_code} = body;
    const rate = Object.entries(res.bpi);
    let response = `Bitcoin rate for period:\n`
    rate.forEach( function(element) {
        response = `${response}${moment(new Date(element[0])).format("MMM Do YY")} - ${Math.round(element[1])} ${currency_code}\n`;
    });
    return addRights(response);
}