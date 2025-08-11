const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const {mainRouter} = require('./routes/mainRoutes');

app.use(bodyParser.json({limit: '100mb'}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api', mainRouter);

app.get('/', (req, res) => {
  res.send('Server is Running');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
