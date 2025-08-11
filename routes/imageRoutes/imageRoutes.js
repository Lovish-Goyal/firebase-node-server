const express = require('express');
const imageRouter = express.Router();

const {
  upload,
  uploadSingleImage,
  uploadManyImages
} = require('../../controllers/imageControllers/imageUploadController');

const {
  getSingleImage,
  getAllImages
} = require('../../controllers/imageControllers/imageRetrieveController');

imageRouter.post('/upload-single-image', upload.single('image'), uploadSingleImage);
imageRouter.post('/upload-many-images', upload.array('images', 4), uploadManyImages);

imageRouter.get('/get-image/:filename', getSingleImage);
imageRouter.get('/get-images', getAllImages);

module.exports = { imageRouter };
