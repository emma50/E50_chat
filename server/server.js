const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// configure server to use socket.io
const io = socketIO(server)       // here is how we communicate between the server and client

// register an event listener with .on() --- "connection" built-in socket.io event
io.on("connection", (socket) => {  // the socket argument here is similar to the one we had access to in index.html. it represents the individual socket
    console.log("New user connected");

    socket.on("disconnect", () => {  
        console.log("User disconnected");
    })
})

app.use(express.static(publicPath));

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