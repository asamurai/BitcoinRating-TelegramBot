const bot = require('./server');
const {dailyCron} = require('./server/cronjob.js');

dailyCron(bot).start();
