var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

// Multer storage configuration
const storageConf = multer.memoryStorage();

// Initialize multer middleware with configured storage
const upload = multer({ storage: storageConf });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Endpoint to handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const fileInfo = {
    name: req.file.originalname, // File name
    type: req.file.mimetype, // File MIME type
    size: req.file.size, // File size in bytes
  };
  res.json(fileInfo);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
