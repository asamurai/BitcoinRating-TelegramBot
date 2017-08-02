const moment = require('moment');
const commandMessages = require('./../locale/messages.json');
const errorsMessages = require('./../locale/errors.json');
const rights = `\nThis data was produced from the CoinDesk Bitcoin Price Index.`;

const addRights = (message) => {
    return `${message}${rights}`;
};

/**
 * Handlers for async actions
 */
module.exports.todayHandler = (body) => {
    const {res, currencyCode} = body;
    const currency = res.bpi[`${currencyCode}`];
    let response = `For today the bitcoin price is ${Math.round(currency.rate_float)} ${currency.code}.\n`;
    return addRights(response);
};

module.exports.yesterdayHandler = (body) => {
    const {res, currencyCode} = body;
    const rate = Object.values(res.bpi)[0];
    let response = `For yesterday the bitcoin price was ${Math.round(rate)} ${currencyCode}.\n`;
    return addRights(response);
};

module.exports.periodHandler = (body) => {
    const {res, currencyCode} = body;
    const rate = Object.entries(res.bpi);
    let response = `Bitcoin rate for period:\n`;
    rate.forEach( function(element) {
        response = `${response}${moment(new Date(element[0])).format("MMM Do YY")} - ${Math.round(element[1])} ${currencyCode}\n`;
    });
    return addRights(response);
};

/**
 * Handlers for static actions
 */

module.exports.staticMessageHandler = (command) => {
    const message = commandMessages[command];
    return message.message;
};

module.exports.commandsHandler = () => {
    const messages = commandMessages;
    let response = Object.values(messages).filter(el=>el.show).map(el=>`${el.commands} - ${el.description}`).join(`\n`);
    response = `Bot command list: \n${response}`;
    return response;
};

/**
 * Handlers for errors
 */

 module.exports.staticErrorHandler = (code = 'undefined_error') => {
     const error = errorsMessages[code] ? errorsMessages[code] : errorsMessages['undefined_error'];
     return error.message;
 };
