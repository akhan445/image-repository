const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', controller.home);

router.get('/about', controller.about);

router.get('/login', controller.login);

router.post('/login', controller.userLogin);

router.get('/upload', controller.upload);

router.post('/upload', upload.array('images'), controller.uploads)

module.exports = router;
