const TelegramBot = require('node-telegram-bot-api');
const config = require(`${process.cwd()}/config`).bot;
const bot = new TelegramBot(config.token, {polling: config.polling});

const {promisify, createApiPath, filters,responseHandler, botListenerHandler} = require(`${process.cwd()}/utils`);
const {filterCommands, checkToday, checkYesterday, checkPeriod, getPeriod, checkCurrency, getCurrency} = filters;
const {staticErrorHandler, todayHandler, yesterdayHandler, periodHandler, staticMessageHandler, commandsHandler} = responseHandler;
const {sendMessage} = botListenerHandler;

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
    switch (true) {
        case checkToday(commands):
            options.today = true;
            isCommandChecked = true;
            isApiCall = true;            
            break;
        case checkYesterday(commands):
            options.yesterday = true;
            isCommandChecked = true;
            isApiCall = true;          
            break;
        case checkPeriod(commands):
            const date = getPeriod(commands);
            options.start = date.start;
            options.end = date.end;
            isCommandChecked = true;
            isApiCall = true;          
            break;    
        default:
            break;
    }
    if (checkCurrency(commands)){
        if (!options.today && !options.yesterday && !options.start && !options.end){
            options.today = true;
        }
        options.currency = getCurrency(commands);
        isCommandChecked = true;
        isApiCall = true;
    }
    if (!isCommandChecked){
        const chatId = msg.chat.id;
        switch (true) {
            case /^\/start$/.test(msg.text):
                sendMessage(bot, chatId, staticMessageHandler('start'));
                break;
            case /^\/commands$/.test(msg.text):
                sendMessage(bot, chatId, commandsHandler());
                break;       
            default:
                sendMessage(bot, chatId, staticErrorHandler('undefined_command'));
                break;
        }
    }else{
        if (isApiCall){
            const request = createApiPath(options);
            const chatId = msg.chat.id;
            promisify(request.apiPath)
                .then((res)=>{
                    const data = {res: JSON.parse(res), currencyCode: request.currency};
                    switch (request.type) {
                    case 'today':
                        sendMessage(bot, chatId, todayHandler(data));
                        break;
                    case 'yesterday':
                        sendMessage(bot, chatId, yesterdayHandler(data));
                        break;
                    case 'period':
                        sendMessage(bot, chatId, periodHandler(data));
                        break;
                    default:
                        sendMessage(bot, chatId, staticErrorHandler('undefined_command'));
                        break;
                    }
                })
                .catch((error)=>{
                    bot.sendMessage(chatId, staticErrorHandler(error.code));
                });
        }
    }
});

module.exports = bot;
