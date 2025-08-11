const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, '../images/users');

// ✅ Retrieve single image by filename
const getSingleImage = (req, res) => {
  const { filename } = req.params;

  const imagePath = path.join(imageDir, filename);

  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: 'Image not found' });
  }

  res.sendFile(imagePath);
};

// ✅ Retrieve list of all image URLs
const getAllImages = (req, res) => {
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read image directory' });
    }

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const imageFiles = files.filter(file =>
      allowedExtensions.includes(path.extname(file).toLowerCase())
    );

    const imageUrls = imageFiles.map(filename => {
      return `${req.protocol}://${req.get('host')}/images/users/${filename}`;
    });

    res.status(200).json({ images: imageUrls });
  });
};

module.exports = {
  getSingleImage,
  getAllImages
};
