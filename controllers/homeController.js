const File = require('../models/file');

exports.getHome = (req, res, next) => {
  // const file = new File({
  //   fileName: "csv2",
  //   data: [
  //     {
  //       1: '2',
  //       3: '293',
  //       35: '68.02',
  //       'Eldon Base for stackable storage shelf, platinum':
  //         '1.7 Cubic Foot Compact "Cube" Office Refrigerators',
  //       'Muhammed MacIntyre': 'Barry French',
  //       '-213.25': '457.81',
  //       38.94: '208.16',
  //       Nunavut: 'Nunavut',
  //       'Storage & Organization': 'Appliances',
  //       0.8: '0.58',
  //     },
  //     {
  //       1: '3',
  //       3: '293',
  //       35: '2.99',
  //       'Eldon Base for stackable storage shelf, platinum':
  //         'Cardinal Slant-D� Ring Binder, Heavy Gauge Vinyl',
  //       'Muhammed MacIntyre': 'Barry French',
  //       '-213.25': '46.71',
  //       38.94: '8.69',
  //       Nunavut: 'Nunavut',
  //       'Storage & Organization': 'Binders and Binder Accessories',
  //       0.8: '0.39',
  //     },
  //     {
  //       1: '4',
  //       3: '483',
  //       35: '3.99',
  //       'Eldon Base for stackable storage shelf, platinum': 'R380',
  //       'Muhammed MacIntyre': 'Clay Rozendal',
  //       '-213.25': '1198.97',
  //       38.94: '195.99',
  //       Nunavut: 'Nunavut',
  //       'Storage & Organization': 'Telephones and Communication',
  //       0.8: '0.58',
  //     },
  //   ],
  // });

  // file
  //   .save()
  //   .then(() => {
  //     res.render('index', {
  //       pageTitle: 'Home',
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

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
      const key = Object.keys(file.data[0]);
      const appendedData = file.data.filter((res, index, arr) => {
        arr.push('new');
        return res.Number == search || res.Footnote == search;
      });
      res.render('table', {
        pageTitle: 'Tabluar',
        file: file,
        fileData: appendedData,
        length: Object.keys(file.data[0]).length,
        tableHeading: key,
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
