// const path = require('path');
// const fs = require('fs');
// const multer = require('multer');

// // Setup multer storage for quotes images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = path.join(__dirname, '../images/quotes');
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}${ext}`);
//   }
// });

// const upload = multer({ storage });

// const QUOTES_JSON_PATH = path.join(__dirname, '../data/quotes.json');

// function readQuotes() {
//   try {
//     if (!fs.existsSync(QUOTES_JSON_PATH)) return [];
//     const data = fs.readFileSync(QUOTES_JSON_PATH);
//     return JSON.parse(data);
//   } catch (error) {
//     console.error('Error reading quotes JSON:', error);
//     return [];
//   }
// }

// function writeQuotes(quotes) {
//   try {
//     fs.writeFileSync(QUOTES_JSON_PATH, JSON.stringify(quotes, null, 2));
//   } catch (error) {
//     console.error('Error writing quotes JSON:', error);
//   }
// }

// // GET handler - returns all quotes as JSON array
// const getQuotes = (req, res) => {
//   const quotes = readQuotes();
//   res.status(200).json(quotes);
// };

// // POST handler - upload image and create new quote with random name
// const postQuotes = [
//   upload.single('image'),
//   (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).send('Image file is required');
//       }

//       const quotes = readQuotes();

//       const newQuote = {
//         id: Date.now().toString(),
//         name: `quote_${Math.floor(Math.random() * 1000000)}`, // random name
//         imageUrl: `/uploads/quotes/${req.file.filename}`,    // URL path to image
//         createdAt: new Date().toISOString(),
//       };

//       quotes.push(newQuote);
//       writeQuotes(quotes);

//       res.status(201).json(newQuote);
//     } catch (error) {
//       console.error('Error posting quote:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   }
// ];

// module.exports = {
//   getQuotes,
//   postQuotes,
//   upload,
// };
