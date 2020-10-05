const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("./users-model");
const restrict = require("../middleware/restrict");



router.post("/register", async (req, res) => {
    const {username, password, department} = req.body;

    try {
        const user = await users.findByUsername(username)

        if(user !== undefined) {
            return res.status(400).json({
                message: "This username already exists!"
            })
        }

        const newUser = await users.addNew({
            username: username,
            password: await bcrypt.hash(password, 14),
            department: department
        })

        const userCreateSuccess = await users.findByID(newUser)

        return res.status(201).json(userCreateSuccess)
    } catch(err) {
        return console.log(err)
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await users.findByUsername(username);
        if(user) {
            const passwordValid = await bcrypt.compare(password, user.password)

            if(!passwordValid) {
                return res.status(400).json({
                    message: "Invalid Credentials"
                })
            }
            
            const token = jwt.sign({
                userID: user.id,
                userDepartment: user.department
            }, process.env.JWT_SECRET)

            return res.status(200).json({
                message: `Welcome user: ${user.username}`,
                token: token
            })
        } else {
            res.status(400).json({
                message: "Username not found"
            })
        }
    } catch(err) {
        return res.status(500).json({
            message: "There was an error"
        })
    }
})

router.get("/", restrict(), async (req, res, next) => {

    try {

        return res.json(await users.findAll())
    } catch(err) {
        next(err)
    }
})

module.exports = router;