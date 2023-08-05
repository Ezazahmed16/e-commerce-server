const createError = require('http-errors')
const users = require('../models/userModel')

// Get all users info 
const getUsers = (req, res, next) => {
    try {
        res.status(200).send({
            message: "Here is all Users.",
            users: users
        })
    } catch (error) {
        next(error)
    }
}

module.exports = getUsers