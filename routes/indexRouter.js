const express = require('express');
const myMulter = require('../middlewares/upload');
const passport=require('passport');
const router = express.Router();
const {index,home,changePhoto} = require('../controllers/IndexController');
const {checkSign}=require('../middlewares/checkSign');
const { route } = require('./authRouter');


 /*GET home page.
*/
router.get('/', index);

router.get('/home',checkSign,home);

router.post("/changePhoto",checkSign,myMulter.upload.single("fileField"),changePhoto);

module.exports = router;
