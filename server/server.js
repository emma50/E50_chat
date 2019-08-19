const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

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
    
    // socket.emit("newEmail", {    // this starts up the newEmail event --- the server received an email send it to the client 
    //     from: "emmanuel@example.com",
    //     text: "Hey watsup!",
    //     createdAt: new Date()
    // });   

    socket.emit("newMessage", {    // this starts up the newMessage event --- the server received a message send it to the client 
        from: "daniella@example.com",
        text: "Hey!",
        createdAt: new Date()
    });    

    socket.on("createMessage", (newMessage) => {    // this is a custom event 
        console.log("createMessage:", newMessage);
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
})



// console.log(__dirname + "/../public");
// console.log(publicPath);

// app.get("/", (req, res) => {
//     // res.send(publicPath);
//     res.sendFile(publicPath);
// })

// app.listen(port, () => {
//     console.log(`server running on port ${port}`);
// })