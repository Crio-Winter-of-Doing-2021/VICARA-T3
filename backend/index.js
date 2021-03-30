const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const fileRouter = require('./routers/file')
const folderRouter = require('./routers/folder')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const app = express();


app.use(bodyParser.json());
app.use(fileUpload());

var cors = require('cors');

app.use(cors());
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter)
app.use(fileRouter)
app.use(folderRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});