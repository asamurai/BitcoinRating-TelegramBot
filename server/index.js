const TelegramBot = require('node-telegram-bot-api');
const config = require(`${process.cwd()}/config`).bot;
const {promisify, createApiPath, filters,responseHandler} = require(`${process.cwd()}/utils`);
const bot = new TelegramBot(config.token, {polling: config.polling});

bot.on('message', (msg) => {
    const commands = filters.filterCommands(msg.text);
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
        case filters.checkToday(commands):
            options.today = true;
            isCommandChecked = true;
            isApiCall = true;            
            break;
        case filters.checkYesterday(commands):
            options.yesterday = true;
            isCommandChecked = true;
            isApiCall = true;          
            break;
        case filters.checkPeriod(commands):
            const date = filters.getPeriod(commands);
            options.start = date.start;
            options.end = date.end;
            isCommandChecked = true;
            isApiCall = true;          
            break;    
        default:
            break;
    }
    if (filters.checkCurrency(commands)){
        if (!options.today &&  !options.yesterday && !options.start && !options.end){
            options.today = true;
        }
        options.currency = filters.getCurrency(commands);
        isCommandChecked = true;
        isApiCall = true;
    }
    if (!isCommandChecked){
        const chatId = msg.chat.id;
        switch (true) {
            case /^\/start/.test(msg.text):
                bot.sendMessage(chatId, responseHandler.staticMessageHandler('start'));
                break;
            case /^\/commands/.test(msg.text):
                bot.sendMessage(chatId, responseHandler.commandsHandler());
                break;       
            default:
                bot.sendMessage(chatId, responseHandler.staticErrorHandler('undefined_command'));
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
                        bot.sendMessage(chatId, responseHandler.todayHandler(data));
                        break;
                    case 'yesterday':
                        bot.sendMessage(chatId, responseHandler.yesterdayHandler(data));
                        break;
                    case 'period':
                        bot.sendMessage(chatId, responseHandler.periodHandler(data));
                        break;
                    default:
                        bot.sendMessage(chatId, responseHandler.staticErrorHandler('undefined_command'));
                        break;
                    }
                })
                .catch((error)=>{
                    bot.sendMessage(chatId, responseHandler.staticErrorHandler(error.code));
                });
        }
    }
});

module.exports = bot;
