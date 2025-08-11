const multer = require('multer');
const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, '../images/users');
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, {recursive: true});
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage });

// upload single image to server

const uploadSingleImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

  res.status(200).json({
    message: 'Image uploaded successfully',
    imageUrl
  });
};

// upload many images to server

const uploadManyImages = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No images uploaded' });
  }

  if(req.files.length > 4) {
    return res.status(400).json({error: 'Limit Exceed than 5'})
  }

  const imageUrls = req.files.map(file => {
    return `${req.protocol}://${req.get('host')}/images/${file.filename}`;
  });

  res.status(200).json({
    message: 'Images uploaded successfully',
    imageUrls
  });
};

module.exports = {
  upload,
  uploadSingleImage,
  uploadManyImages
};