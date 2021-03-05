const express = require('express');
const path = require('path');

const app = express();

var cors = require('cors');

app.use(cors());

app.use('/static', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './templates/index.html'));
});

app.get('/drive', function (req, res) {
    res.sendFile(path.join(__dirname, './templates/drive.html'));
});

app.listen(process.env.PORT);