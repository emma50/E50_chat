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

    let li = document.createElement("li");
    li.innerText = `${message.from}, ${message.text}`;

    let ol = document.getElementById("messages");
    ol.append(li);
}) 

// socket.emit("createMessage", {
//     from: "John",
//     text: "Hi"
// }, function (message) {   // this function runs when the client/emitter receives Acknowledgement from the server that verifies if things went right or not 
//     // console.log("Got it")
//     console.log(`Got it ---> ${message.text}, ${message.accepted}`);
// })

// socket.on("newEmail", function (email) {  // "newEmail" a custom event --- this listens to the newEmail event emitted/created on server.js
//     console.log("new Email:", email);
// })

let msg = document.getElementById("message-form");
let input = document.getElementById("input");

msg.addEventListener("submit", function (e) {
    e.preventDefault();   // prevents the form from sending and reloading the page which is the default

    socket.emit("createMessage", {
        from: "User",
        text: input.value
    }, function () {    // this function is to run Acknowledgement
        //
    })
})