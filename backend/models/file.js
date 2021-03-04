const mongoose = require('mongoose');

// defining a schema
let file_schema = new mongoose.Schema({
    file_id: String,
    key: String,
    bucket: String,
    take: Boolean,
    email: String,
    Password: String,
    isFav: Boolean,
    file_name: String
});

let file_model = mongoose.model('file_details', file_schema);

module.exports = file_model
