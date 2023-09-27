require('dotenv').config();
//no distinction between login/registering for the purposes of this project
const jwt = require('jsonwebtoken');

const {BadRequestError} = require('../errors');

const login = async (req, res) => {
//mongoose validation
    const {username, password} = req.body;
    if(!username || !password) {
        throw new BadRequestError('Please provide login and password')
    }
    try{
    //only for demo as DB is not connected, dummy user id
    const id = new Date().getDate();

    //try to keep payload small
    //secret created in .env file; only for demo - in production use long complex values
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'})
    //console.log(username, password);
    res.status(200).json({msg: "user created", token})
    } catch(error) {
        console.log(error)
    }
}

const dashboard = async (req, res) => {
    //console.log(req.user)
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data: ${luckyNumber}`
    })
}

module.exports = {login, dashboard}