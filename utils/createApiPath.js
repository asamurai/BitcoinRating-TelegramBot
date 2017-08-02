module.exports = (object = {currency: 'USD'}) => {
    const response = {};
    let type, apiPath,
        currency = object.currency;
    if(object.today){
        apiPath = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;
        type = 'today';
    }
    if(object.yesterday || (object.start && object.end)){
        apiPath = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`;
    }
    if(object.yesterday){
        apiPath = `${apiPath}&for=yesterday`;
        type = 'yesterday';
    }
    if(object.start && object.end){
        apiPath = `${apiPath}&start=${object.start}&end=${object.end}`;
        type = 'period';
    }
    if(!apiPath){
        apiPath = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;
        type = 'today';       
    }
    response.apiPath = apiPath;
    response.type = type;
    response.currency = currency;
    return response;
};
