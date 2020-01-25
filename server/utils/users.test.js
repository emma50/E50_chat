const expect = require("expect");
const {Users} = require("./users");

describe("Users", () => {
    let users;
    beforeEach(() => {     
       users = new Users();
       users.users = [{     
            id: "1",
            name: "John",
            room: "The Thinkers Gang"
       }, {
            id: "2",
            name: "Daniel",
            room: "The Doers Gang"
       }, {
            id: "3",
            name: "Chukwuka",
            room: "The Thinkers Gang"
       }]    
    })

    it("should add new user", () => {
        let users = new Users();    
        let user = {       
            id: "abc123",
            name: "Emmanuel",
            room: "The Fans Club"
        }
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);   
    })

    it("should remove user", () => {
        let userId = "1";
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    })

    it("should not remove user", () => {
        let userId = "dycy";
        let user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    })

    it("should find user", () => {
        let userId = "1"
        let user = users.getUser(userId);

        expect(user.id).toBe(userId)
    })

    it("should not find user", () => {
        let userId = "dycy"
        let user = users.getUser(userId);

        expect(user).toNotExist()
    })

    it("should return names for the Thinkers Gang", () => {
        let userList = users.getUserList("The Thinkers Gang");

        expect(userList).toEqual(["John", "Chukwuka"]);
    })

    it("should return names for the Doers Gang", () => {
        let userList = users.getUserList("The Doers Gang");

        expect(userList).toEqual(["Daniel"]);
    })
})