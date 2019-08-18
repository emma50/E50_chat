const path = require("path");
const express = require("express");

const app = express();
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000

console.log(__dirname + "/../public");
console.log(publicPath);

app.use(express.static(publicPath));

// app.get("/", (req, res) => {
//     // res.send(publicPath);
//     res.sendFile(publicPath);
// })

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})