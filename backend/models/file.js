const mongoose = require('mongoose');

// defining a schema
let file_schema = new mongoose.Schema({
    key: String,
    bucket: String,
    isFav: Boolean,
    file_name: String
});

let file_model = mongoose.model('file_details', file_schema);

module.exports = file_model
