var multer = require('multer');
const path = require('path');

module.exports.files = {
  storage: function () {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', 'public', 'files'));
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    return storage;
  },

  allowedFile: function (req, file, cb) {
    if (!file.originalname.match(/\.(csv)$/)) {
      req.fileValidationError = 'Only csv files are allowed!';
      return cb(new Error('Only csv files are allowed!'), false);
    }
    cb(null, true);
    return file;
  },
};
