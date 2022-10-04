const multer = require('multer');
const fileUpload = require('../middlewares/upload_middleware');
const File = require('../models/file');
const csv = require('csvtojson');
const path = require('path');

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
        const fileName = req.file.filename;
        csv()
          .fromFile(path.join(__dirname, '../','public','files',`${fileName}`))
          .then(function (jsonArrayObj) {
            const file = new File({
              fileName: fileName,
              data: jsonArrayObj,
            });
            file
              .save()
              .then((files) => {
                res.redirect('/');
              })
              .catch((err) => {
                console.log(err);
              });
          });
      }
    });
  },
};
