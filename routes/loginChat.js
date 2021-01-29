let express = require('express');
let router = express.Router();
const { checkSign } = require('../middlewares/checkSign');
let io = require('socket.io');
let http = require('http');
let socket = io(http);

/* GET home page. */
router.get('/chat',checkSign, function(req, res, next) {
    res.render('loginChat.ejs');

});

module.exports = router;