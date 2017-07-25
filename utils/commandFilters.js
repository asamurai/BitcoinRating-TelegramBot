module.exports.filterCommands = (msg) => {
    return msg.split(' ').filter(el=>/^#/.test(el));
}
//check currency
module.exports.checkCurrency = (array) => {
    return !!array.filter(el=>/^#currency=/.test(el)).length
}

//get currency
module.exports.getCurrency = (array) => {
    return array.find(el=>/^#currency=/.test(el)).split('=')[1].toUpperCase();
}

//check today
module.exports.checkToday = (array) => {
    return !!array.filter(el=>/^#today/.test(el)).length
}

//check yestarday
module.exports.checkYesterday = (array) => {
    return !!array.filter(el=>/^#yesterday/.test(el)).length
}

//check period
module.exports.checkPeriod = (array) => {
    return (!!array.filter(el=>/^#start/.test(el)).length && !!array.filter(el=>/^#end/.test(el)).length)
}

//get period
module.exports.getPeriod = (array) => {
    let start, end;
    start = array.find(el=>/^#start=/.test(el)).split('=')[1];
    end = array.find(el=>/^#end=/.test(el)).split('=')[1];
    return {start, end};
}