const mongoose = require('mongoose');

// defining a schema
let file_schema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    bucket: {
        type: String,
        required: true,
    },
    isFav: {
        type: Boolean,
    },
    file_name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

let file_model = mongoose.model('file_details', file_schema);

module.exports = file_model