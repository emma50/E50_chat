// initiating the request. making a request from the client to the server to open up a web socket and keep 
// the connection open we make use of the below method available to us because we loaded the above library
const socket = io();    
        
socket.on("connect", function () {  // "connect" a built-in socket.io event
    console.log("Connected to server");

    // socket.emit("createMessage", {
    //     from: "john@example.com",
    //     text: "Hey! This is a new Message"
    // })

    // socket.emit("createEmail", {
    //     to: "john@example.com",
    //     text: "Hey! This is Emmanuel",
    //     createdAt: new Date()
    // })
})

socket.on("disconnect", function () {  // "disconnect" a built-in socket.io event 
    console.log("Disconnected from server");
})

socket.on("newMessage", function (message) {  // "newMessage" a custom event --- this listens to the newMessage event emitted/created on server.js
    console.log("new Message:", message);
})

// socket.on("newEmail", function (email) {  // "newEmail" a custom event --- this listens to the newEmail event emitted/created on server.js
//     console.log("new Email:", email);
// })