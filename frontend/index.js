const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT;

// Homepage
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './templates/index.html'));
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});