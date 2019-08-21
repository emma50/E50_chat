const path = require("path");
const http = require("http");

const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// express middleware
app.use(express.static(publicPath));

// configure server to use socket.io
const io = socketIO(server)       // here is how we communicate between the server and client

// register an event listener with .on() method --- "connection" built-in socket.io event
io.on("connection", (socket) => {  // the socket argument here is similar to the one we had access to in index.html. it represents the individual socket
    console.log("New user connected");

    // socket.emit() emits event to a single connection
    socket.emit("newMessage", generateMessage("Admin: ", "Welcome to the chat app"));   
    
    socket.broadcast.emit("newMessage", generateMessage("Admin: ", "New user joined"));  
    
    // socket.emit() emits event to a single connection
    // socket.emit("newMessage", {    // this starts up the newMessage event --- the server received a message send it to the client 
    //     from: "daniella@example.com",
    //     text: "Hey!",
    //     createdAt: new Date()
    // });    

    socket.on("createMessage", (message, callback) => {    // the server serves an Acknowledgement to the client/emitter notifying the client if things went well or not by calling the callback
        console.log("createMessage:", message);

        io.emit("newMessage", generateMessage(message.from, message.text));
        callback({    // the callback is called
            text: "This is from the server ",
            accepted: true + "!"
        });   

        // io.emit() emits events to every single connection
        // io.emit("newMessage", {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })

        // Broadcasting is a way to emit events to everybody but one specific user
        // To broadcast we specify the individual socket --- this lets the socket.io library to know which user 
        // should not get the event. meaning the user called here will not get the event
        // socket.broadcast.emit("newMessage", {    // NOTE: broadcast has it's own emit function
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })     
    })    

    socket.on("createLocationMessage", (coords) => {
        // io.emit("newMessage", generateMessage("Admin: ", `${coords.latitude}, ${coords.longitude}`))
        io.emit("newLocationMessage", generateLocationMessage("Admin: ", coords.latitude, coords.longitude))
    })

    // socket.on("createEmail", (newEmail) => {    // this is a custom event 
    //     console.log("createEmail:", newEmail);
    // })  

    socket.on("disconnect", () => {    // this listens to the disconnect event in index.js
        console.log("User disconnected");
    })
})

server.listen(port, () => {
    console.log(`server running on port ${port}`);
});
