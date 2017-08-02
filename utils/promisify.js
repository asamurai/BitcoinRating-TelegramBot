const Promise = require('bluebird');
const request = require('request');

module.exports = (url) => {
    return new Promise((resolve, reject)=>{
        request.get(url,(error, response, body)=>{
            if(error){
                reject(error);
            }
            resolve(body);
        });
    });
};
