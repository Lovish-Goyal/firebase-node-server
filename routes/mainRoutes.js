const { imageRouter } = require('./imageRoutes/imageRoutes');
const { notificationRouter } = require('./notificationRoutes/notificationRoutes');
const express = require('express')
const mainRouter = express.Router();

mainRouter.use('/images', imageRouter);
mainRouter.use('/notifications', notificationRouter);

module.exports = { mainRouter };