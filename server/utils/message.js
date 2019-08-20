const generateMessage = (from, text) => {     // returns an object
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };     
};

module.exports = { generateMessage };