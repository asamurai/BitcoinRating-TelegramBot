const TelegramBot = require('node-telegram-bot-api');
const config = require(`${process.cwd()}/config`).bot;

const bot = new TelegramBot(config.token, {polling: config.polling});

module.exports = bot;