const multer=require('multer');
let Storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/');
    },
    filename: function (req, file, callback) {
        callback(null,Date.now()+"_"+file.originalname);
    }

});

let upload = multer({ storage : Storage});

module.exports.upload=upload;