const expect = require("expect");
const {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
    it("should generate the correct message", () => {
        let from = "Emma";
        let text = "Hey!";
        let message = generateMessage(from, text);
        
        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({from, text});
    });
});

describe("generateLocationMessage", () => {
    it("should generate the correct location object", () => {
        let from = "Emma";
        let latitude = 23;
        let longitude = 12;
        let url = `https://www.google.com/maps?q=${latitude},${longitude}`
        let message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({from, url});
    });
});

