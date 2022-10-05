const File = require('../models/file');

exports.getHome = (req, res, next) => {
  File.find()
    .then((files) => {
      res.render('index', {
        files: files,
        pageTitle: 'Home',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getFile = (req, res, next) => {
  const fileId = req.params.fileId;
  File.findById(fileId)
    .then((file) => {
      res.render('table', {
        pageTitle: 'Tabluar',
        file: file,
        fileData: file.data,
        length: Object.keys(file.data[0]).length,
        tableHeading: Object.keys(file.data[0]),
      });
    })
    .catch((err) => console.log(err));
};

exports.postFile = (req, res, next) => {
  const fileId = req.params.fileId;
  const search = req.body.search;
  File.findById(fileId)
    .then((file) => {
      const keys = Object.keys(file.data[0]);
      const appendedData = file.data.filter((res) => {
        return (
          res[keys[0]] == search ||
          res[keys[1]] == search ||
          res[keys[2]] == search ||
          res[keys[3]] == search ||
          res[keys[4]] == search ||
          res[keys[5]] == search ||
          res[keys[6]] == search
        );
        // let isValid = true;
        // for (let i = 0; i < keys.length; i++) {
        //   console.log(res[keys[i]] == search);
        //   // if (res[keys[i]] != search) {
        //   //   isValid = false;
        //   // };
        //   isValid=isValid && res[keys[i]==search]
        // }
        // return isValid;
      });
      res.render('table', {
        pageTitle: 'Tabluar',
        file: file,
        fileData: appendedData,
        length: Object.keys(file.data[0]).length,
        tableHeading: keys,
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteFile = (req, res, next) => {
  const fileId = req.body.fileId;
  File.deleteOne(fileId)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};
