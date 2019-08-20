const expect = require("expect");
const {generateMessage} = require("./message");

describe("generateMessage", () => {
    it("should generate the correct message", () => {
        let from = "Emma";
        let text = "Hey!";
        let message = generateMessage(from, text);
        
        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({from, text});
        // expect(message.from).toBe(from);
        // expect(message.text).toBe(text);
    });
});

