const TelegramBot = require('node-telegram-bot-api');
const config = require(`${process.cwd()}/config`).bot;
const {promisify, createApiPath, filterCommands, checkCurrency, getCurrency, checkToday, checkYesterday, checkPeriod, getPeriod} = require(`${process.cwd()}/utils`);
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
        options.currency = getCurrency(commands);
        isCommandChecked = true;
        isApiCall = true;
    }
    if(!isCommandChecked){
        //send message that this command is not available
    }else{
        if(isApiCall){
            promisify(createApiPath(options))
                .then((res)=>{
                    //return nice viewed response
                })
                .catch((error)=>{
                    //send error message
                })
        }else{
            if(/^#start/.test(el)){
                //send message about bot
                isCommandChecked = true;
            }
            if(/^#commands/.test(el)){
                //send message about main commands
                isCommandChecked = true;
            }           
        }
    }
});

module.exports = bot;