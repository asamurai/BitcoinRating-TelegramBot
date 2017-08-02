let config;
switch (process.env.NODE_ENV){
case 'dev':
    config = require('./config.dev.json');
    break;
case 'prod':
    config = require('./config.prod.json');
    break;
case 'test':
    config = require('./config.test.json');
    break;
default:
    config = require('./config.dev.json');
    break;
}
module.exports = config;
