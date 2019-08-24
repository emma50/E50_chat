const expect = require("expect");
const {isRealString} = require("./validation");

describe("isRealString", () => {
    it("should reject non-string values", () => {
        let isStr = isRealString(23);
        expect(isStr).toBe(false); 
    });

    it("should reject strings with only spaces", () => {
        let isStr = isRealString("   ");
        expect(isStr).toBe(false); 
    });

    it("should allow strings with non-spaces characters", () => {
        let isStr = isRealString("  Emma  ");
        expect(isStr).toBe(true); 
    });
});