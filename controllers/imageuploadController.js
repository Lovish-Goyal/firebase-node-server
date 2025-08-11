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

// upload user profile image to server
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

  res.status(200).json({
    message: 'Image uploaded successfully',
    imageUrl
  });
};

module.exports = {
  upload: upload.single('image'),
  uploadImage
};
