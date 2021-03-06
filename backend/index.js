const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const fileRouter = require('./routers/file_management')
const app = express();

var cors = require('cors');

app.use(cors());
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter)
app.use(fileRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});