const path = require("path");
const http = require("http");

const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server)    // configure server to use socket.io --- here is how we communicate between the server and client
const users = new Users();  // create instance of user

// express middleware
app.use(express.static(publicPath));

// register an event listener with .on() method --- "connection" built-in socket.io event
io.on("connection", (socket) => {  // the socket argument here is similar to the one we had access to in index.html. it represents the individual socket
    console.log("New user connected");

    // socket.emit() emits event to a single connection
    // socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));   
    
    // Broadcasting is a way to emit events to everybody but one specific user --- the message sender
    // socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));  

    socket.on("join", (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback("Name and room name are required");
        } else {
            socket.join(params.room)    // join a room --- we want to emit chat messages to other people in the room
            // socket.leave(params.room)  --- you could also leave a room
            users.removeUser(socket.id)   // make sure user does not exist
            users.addUser(socket.id, params.name, params.room)   // if user does not exist adds user
            // ways of emitting to a specific room
            // io.emit() -> io.to("The Network group")
            // socket.emit() -> socket.to().emit()   
            // socket.broadcast.emit() ->  socket.broadcast.to().emit()

            io.to(params.room).emit("updateUserList", users.getUserList(params.room));
            // target specific users
            socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));   
            socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined`));  

            callback();
        }
    })
    
    // socket.emit() emits event to a single connection
    // socket.emit("newMessage", {    // this starts up the newMessage event --- the server received a message send it to the client 
    //     from: "daniella@example.com",
    //     text: "Hey!",
    //     createdAt: new Date()
    // });    

    socket.on("createMessage", (message, callback) => {    // the server serves an Acknowledgement to the client/emitter notifying the client if things went well or not by calling the callback
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {   // verify user exist and it's a string
            return io.to(user.room).emit("newMessage", generateMessage(user.name, message.text));
        }

        callback();     // the callback is called

        // io.emit() emits events to every single connection
        // io.emit("newMessage", {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })

        // Broadcasting is a way to emit events to everybody but one specific user --- the message sender
        // To broadcast we specify the individual socket --- this lets the socket.io library to know which user 
        // should not get the event. meaning the user called here will not get the event
        // socket.broadcast.emit("newMessage", {    // NOTE: broadcast has it's own emit function
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })     
    })    

    socket.on("createLocationMessage", (coords) => {
        let user = users.getUser(socket.id);

        if (user) {   // verify user exist and it's a string
            return io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }

        callback();     
    })

    // socket.on("createEmail", (newEmail) => {    // this is a custom event 
    //     console.log("createEmail:", newEmail);
    // })  

    socket.on("disconnect", () => {    // this listens to the disconnect event in index.js
        // console.log("User disconnected");
        let user = users.removeUser(socket.id);

        if (user) {  // we emit an event to all room members
            // update the uwer room
            io.to(user.room).emit("updateUserList", users.getUserList(user.room))
            // print a message
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left` ))
        }
    })
})

server.listen(port, () => {
    console.log(`server running on port ${port}`);
});
