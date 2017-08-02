const schedule = require('node-cron').schedule;
const {promisify,responseHandler, botListenerHandler} = require(`${process.cwd()}/utils`);
const {staticErrorHandler, todayHandler} = responseHandler;
const {sendMessage} = botListenerHandler;

const CHAT_ID = 207302485;

/**
 * Runs cronjob every six hours
 */

const getTodayRaiting = 
  (bot) => 
  promisify('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
  .then((res)=>{
    const data = {res: JSON.parse(res), currencyCode: 'USD'};
    sendMessage(bot, CHAT_ID, todayHandler(data));
  }).catch(error=>bot.sendMessage(CHAT_ID, staticErrorHandler(error.code)));

module.exports.dailyCron = (bot) => schedule('* * */6 * * *', function () {getTodayRaiting(bot);}, false);


