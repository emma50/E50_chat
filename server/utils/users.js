[{
    id: "n875utjtr898954nj9uu9u",
    name:"Emmanuel",
    room: "Big Boys Club"
}]

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id ,name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        // let user = this.users.find((user) => user.id == id);
        let user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id)  // not the user
        }

        return user;    // return not the user
    }

    getUser(id) {
        let users = this.users.find((user) => user.id === id);

        return users;
    }

    getUserList(room) {
        let users =  this.users.filter((user) => user.room === room);
        let namesArr = users.map((user) => user.name);

        return namesArr;
    }
}

module.exports = {Users }