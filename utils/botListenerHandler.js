const {staticErrorHandler} = require('./responseHandler');

module.exports.sendMessage = (bot, chat, cb) => {
    bot
        .sendMessage(chat, cb)
        .catch(error=>bot.sendMessage(chat, staticErrorHandler(error.code)));
};
