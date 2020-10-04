const express = require("express");
// const cookieParser = require("cookie-parser");
const server = express();

server.use(express.json())

server.use("/", (req, res) => {
    return res.json({
        message: "Server running !"
    })
})

module.exports = server;