// initiating the request. making a request from the client to the server to open up a web socket and keep 
// the connection open we make use of the below method available to us because we loaded the above library
const socket = io();    

function scrollToBottom() {
    // Selectors
    let messages = $("#messages");
    let newMessage = messages.children("li:last-child");    // get the last list item
    // Heights
    let clientHeight = messages.prop("clientHeight");
    let scrollTop = messages.prop("scrollTop");
    let scrollHeight = messages.prop("scrollHeight");
    let newMessageHeight = newMessage.innerHeight();     // get the last list item inner height
    let lastMessageHeight = newMessage.prev().innerHeight();    // get the second to the last list item's inner height

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);    // pass in scrollHeight to scrollTop() to get the total height of container
    }

}
        
socket.on("connect", function () {  // "connect" a built-in socket.io event
    console.log("Connected to server");
    var params = $.deparam(window.location.search);

    socket.emit("join", params, function (err) {    // join is a custom event 
        if (err) {
            alert(err);
            window.location.href = "/"    // if error exist - re-direct user to root page
        } else {
           console.log("No error")    // print this if no error exist 
        }
    })   

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

socket.on("updateUserList", function (users) {
    // console.log("Users list:", users);
    let ol = document.createElement("ol");
    // iterate over every user
    users.forEach((user) => {
        let li = document.createElement("li");
        li.innerText = user;
        ol.append(li);
    })

    $("#users").html(ol);
})

socket.on("newMessage", function (message) {  // "newMessage" a custom event --- this listens to the newMessage event emitted/created on server.js
    console.log("new Message:", message);
    // let template = $("#message-template").text();
    let timeStamp = moment(message.createdAt).format("h:mm a");
    let template = $("#message-template").html();
    let html = Mustache.render(template, {
        text:  message.text,
        from: message.from,
        createdAt: `${timeStamp}:`
    });
 
    $("#messages").append(html);
    scrollToBottom();

    // let timeStamp = moment(message.createdAt).format("h:mm a");
    // let li = document.createElement("li");
    // li.innerText = `${message.from}  ${timeStamp}: ${message.text}`;

    // let ol = document.getElementById("messages");
    // ol.append(li);
}) 

socket.on("newLocationMessage", function (message) {  // "newLocationMessage" a custom event --- this listens to the newLocationMessage event emitted/created on server.js
    let timeStamp = moment(message.createdAt).format("h:mm a");
    let template = $("#location-message-template").html();
    let html = Mustache.render(template, {
        url:  message.url,
        from: message.from,
        createdAt: `${timeStamp}:`
    });
 
    $("#messages").append(html);
    scrollToBottom();

    // let li = document.createElement("li");
    // li.innerText = `${message.from}  ${timeStamp}:`;

    // let a = document.createElement("a");
    // a.innerText = "My current Location";
    // a.target = "_blank";
    // a.href = `${message.url}`;
    // li.append(a);

    // let ol = document.getElementById("messages");
    // ol.append(li);
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