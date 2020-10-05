const express = require("express");
// const cookieParser = require("cookie-parser");
const server = express();
const usersRouter = require("./users/users-router")

server.use(express.json())

server.use("/users", usersRouter);

server.use("/", (req, res) => {
    return res.json({
        message: "Server running !"
    })
})


module.exports = server;