const generateMessage = (from, text) => {    
    return {      // returns an object
        from,
        text,
        createdAt: new Date().getTime()
    };     
};

const generateLocationMessage = (from, latitude, longitude) => {    
    return {     // returns an object
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    };     
};

module.exports = { generateMessage, generateLocationMessage };