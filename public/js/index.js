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
    li.innerText = `${message.from} ${message.text}`;

    let ol = document.getElementById("messages");
    ol.append(li);
}) 

socket.on("newLocationMessage", function (message) {  // "newLocationMessage" a custom event --- this listens to the newLocationMessage event emitted/created on server.js
    let li = document.createElement("li");
    li.innerText = `${message.from}`;

    let a = document.createElement("a");
    a.innerText = "My current Location";
    a.target = "_blank";
    a.href = `${message.url}`;
    li.append(a);

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

let msg = document.getElementById("message-form");
let input = document.getElementById("input");

msg.addEventListener("submit", function (e) {
    e.preventDefault();   // prevents the form from sending and reloading the page which is the default

    socket.emit("createMessage", {
        from: "User: ",
        text: input.value
    }, function () {    // this function is to run Acknowledgement
        input.value = "";     // clear the input value
    })
})

let locationBtn = document.getElementById("send-location");

locationBtn.addEventListener("click", function () {
    if (!navigator.geolocation) {  // verifies if the user browser has the inbuilt navigator geolocation API supported
        return alert("Geolocation not supported by your browser");
    }

    // disable location button after ascertaining the browser supports geolocation API
    locationBtn.setAttribute("disabled", "disabled");
    locationBtn.innerText = "Sending location...";     // change locationBtn text

    // fetch/get a users current position we use a method available to geolocation called getCurrentPosition()
    // NOTE: getCurrentPosition(successCallback, errorCallback) takes two argument successCallback, errorCallback
    navigator.geolocation.getCurrentPosition(function (position) {  // the success callback takes the position parameter
        locationBtn.disabled = false;     // re-enable the disabled button
        locationBtn.innerText = "Send location";    // reset locationBtn back to original value
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {    // the error callback
        locationBtn.disabled = false;     // re-enable the disabled button if we could not get location
        locationBtn.innerText = "Send location";   // reset locationBtn back to original value
        alert("Unable to fetch location")
    })
})