const express = require('express');
const router = express.Router();
const authMW = require('../middleware/auth')

const {login, dashboard} = require('../controllers/main')

router.route('/dashboard').get(authMW, dashboard)

router.route('/login').post(login)

module.exports = router