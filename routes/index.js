const express = require('express');
const router = express.Router();

const home = require('../controllers/homeController');
const file = require('../controllers/fileController');


router.get('/', home.getHome);

router.post('/fileUpload',file.uploadFile);

module.exports = router;