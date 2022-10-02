
const multer = require('multer');
const fileUpload = require('../middlewares/upload_middleware');


module.exports = {
  uploadFile: function (req, res) {
    var upload = multer({
      storage: fileUpload.files.storage(),
      allowedFile: fileUpload.files.allowedFile,
    }).single('file');
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.send(err);
      } else if (err) {
        res.send(err);
      } else {
           
        res.redirect('/')
      }
    });
  },
};