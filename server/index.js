const TelegramBot = require('node-telegram-bot-api');
const config = require(`${process.cwd()}/config`).bot;
const {promisify, createApiPath, filterCommands, checkCurrency, getCurrency, checkToday, checkYesterday, checkPeriod, getPeriod, todayHandler, yesterdayHandler, periodHandler} = require(`${process.cwd()}/utils`);
const bot = new TelegramBot(config.token, {polling: config.polling});

bot.on('message', (msg) => {
    const commands = filterCommands(msg.text);
    let isCommandChecked = false;
    let isApiCall = false;
    const options = {
        currency: 'USD',
        today: false,
        yesterday: false,
        start: null,
        end: null
    };
    if(checkToday(commands) && !isCommandChecked){
        options.today = true;
        isCommandChecked = true;
        isApiCall = true;
    }
    if(checkYesterday(commands) && !isCommandChecked){
        options.yesterday = true;
        isCommandChecked = true;
        isApiCall = true;
    }
    if(checkPeriod(commands) && !isCommandChecked){
        const date = getPeriod(commands);
        options.start = date.start;
        options.end = date.end;
        isCommandChecked = true;
        isApiCall = true;
    }
    if(checkCurrency(commands)){
        if(!options.today){
            options.today = true;
        }
        options.currency = getCurrency(commands);
        isCommandChecked = true;
        isApiCall = true;
    }
    if(/^#start/.test(msg.text) && !isCommandChecked){
        //send message about bot
        console.log('start')
        isCommandChecked = true;
    }
    if(/^#commands/.test(msg.text) && !isCommandChecked){
        //send message about main commands
        console.log('commands');
        isCommandChecked = true;
    } 
    if(!isCommandChecked){
        console.log('nothing checked');
    }else{
        if(isApiCall){
            const request = createApiPath(options);
            const chatId = msg.chat.id;
            promisify(request.apiPath)
                .then((res)=>{
                    const data = {res: JSON.parse(res), currency_code: request.currency};
                    switch (request.type) {
                        case 'today':
                            bot.sendMessage(chatId, todayHandler(data));
                            break;
                        case 'yesterday':
                            bot.sendMessage(chatId, yesterdayHandler(data));
                            break;
                        case 'period':
                            bot.sendMessage(chatId, periodHandler(data));
                            break;
                        default:
                            // statements_def
                            break;
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }
});

module.exports = bot;