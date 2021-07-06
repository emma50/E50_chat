const socket = io();    

function scrollToBottom() {
    let messages = $("#messages");
    let newMessage = messages.children("li:last-child");
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
        
socket.on("connect", function () {
    console.log("Connected to server");
    var params = $.deparam(window.location.search);

    socket.emit("join", params, function (err) {
        if (err) {
            alert(err);
            window.location.href = "/" 
        } else {
           console.log("No error") 
        }
    })   
})

socket.on("disconnect", function () {
    console.log("Disconnected from server");
})

socket.on("updateUserList", function (users) {
    let ol = document.createElement("ol");
    users.forEach((user) => {
        let li = document.createElement("li");
        li.innerText = user;
        ol.append(li);
    })

    $("#users").html(ol);
})

socket.on("newMessage", function (message) {
    let timeStamp = moment(message.createdAt).format("h:mm a");
    let template = $("#message-template").html();
    let html = Mustache.render(template, {
        text:  message.text,
        from: message.from,
        createdAt: `${timeStamp}:`
    });
 
    $("#messages").append(html);
    scrollToBottom();
}) 

socket.on("newLocationMessage", function (message) {
    let timeStamp = moment(message.createdAt).format("h:mm a");
    let template = $("#location-message-template").html();
    let html = Mustache.render(template, {
        url:  message.url,
        from: message.from,
        createdAt: `${timeStamp}:`
    });
 
    $("#messages").append(html);
    scrollToBottom();
}) 

let msg = document.getElementById("message-form");
let input = document.getElementById("input");

msg.addEventListener("submit", function (e) {
    e.preventDefault();

    socket.emit("createMessage", {
        text: input.value
    }, function () { 
        input.value = "";
    })
})

let locationBtn = document.getElementById("send-location");

locationBtn.addEventListener("click", function () {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser");
    }

    locationBtn.setAttribute("disabled", "disabled");
    locationBtn.innerText = "Sending location...";

    navigator.geolocation.getCurrentPosition(function (position) {
        locationBtn.disabled = false;
        locationBtn.innerText = "Send location";
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {   
        locationBtn.disabled = false;
        locationBtn.innerText = "Send location";
        alert("Unable to fetch location")
    })
})
