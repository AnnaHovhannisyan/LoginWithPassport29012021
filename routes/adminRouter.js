var express = require('express');
const { admin } = require('../controllers/AdminController');
var router = express.Router();


router.get('/', admin);


module.exports=router;