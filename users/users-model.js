
const db = require("../config");

const findByUsername = async (username) => {
    const foundUser = await db("users")
        .select("*")
        .where("users.username", username)
        .first();

    return foundUser
}

const findByID = async (id) => {
    const [user] = await db("users as u")
        .select("u.id", "u.username")
        .where("u.id", id);

    return user
}

const findAll = () => {
    const users = db("users")
        .select("id", "username", "department")
        
    return users
}

const addNew = async (user) => {

    const [newUser] = await db("users")
        .insert(user)

    return newUser
}

module.exports = {
    addNew,
    findByUsername,
    findByID,
    findAll,
}