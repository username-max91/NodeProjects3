require('dotenv').config();
//no distinction between login/registering for the purposes of this project
const jwt = require('jsonwebtoken');
const customAPIError = require('../errors/custom-error')

const login = async (req, res) => {
//mongoose validation
    const {username, password} = req.body;
    if(!username || !password) {
        throw new customAPIError('Please provide login and password', 400)
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
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, John Doe`, secret: `Here is your authorized data ${luckyNumber}`})
}

module.exports = {login, dashboard}