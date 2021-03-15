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
    isTrash: {
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
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

file_schema.pre('save', function preSave(next) {
    var file = this;
    file.updatedAt = Date.now;
    next();
});

let file_model = mongoose.model('file_details', file_schema);

module.exports = file_model