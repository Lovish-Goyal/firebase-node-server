const express = require('express');
const {sendToAll, sendToAny} = require('../../controllers/notificationController/notificationsController');
const notificationRouter = express.Router();

notificationRouter.post('/send-notification-to-all', sendToAll);
notificationRouter.post('/send-notification-to-any', sendToAny);

module.exports = {notificationRouter};