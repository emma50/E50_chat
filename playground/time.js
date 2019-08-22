const moment = require("moment");    // moment --- a fantastic time library

// let date = new Date();
// console.log(date.getMonth());

console.log(new Date());

// let date = moment();
// console.log(date.format());
// console.log(date.format("h:mm a"));     // 10:25 am
// console.log(date.format("DD MMM YYYY"));    // 22 Aug 2019
// console.log(date.format("dddd, MMMM Do YYYY, h:mm:ss a"));    // "Sunday, February 14th 2010, 3:25:50 pm"
// console.log(date.format("ddd, hA"))    // "Sun, 3PM"
// date.add(7, 'd').add(24, "y").subtract(220, "M");
// console.log(date.format("MMM, Do YYYY")) 

let createdAt = 1234;
let date = moment(createdAt);
console.log(date.format("h:mm a"));

