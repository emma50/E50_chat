const moment = require("moment");

const generateMessage = (from, text) => {    
    return {      // returns an object
        from,
        text,
        createdAt: moment().valueOf()
    };     
};

const generateLocationMessage = (from, latitude, longitude) => {    
    return {     // returns an object
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    };     
};

module.exports = { generateMessage, generateLocationMessage };