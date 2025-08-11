const express = require('express');
const {sendToAll, sendToAny} = require('../controllers/notificationsController');
const {upload, uploadImage} = require('../controllers/imageuploadController');
const router = express.Router();

router.post('/send-notification-all', sendToAll);
router.post('/send-notification-any', sendToAny);
router.post('/upload-image', upload, uploadImage);

module.exports = {router};  