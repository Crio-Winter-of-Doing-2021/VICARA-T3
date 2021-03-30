const mongoose = require('mongoose');

// defining a schema
let folder_schema = new mongoose.Schema({
    isFav: {
        type: Boolean,
        default: false,
    },
    isTrash: {
        type: Boolean,
        default: false,
    },
    parentId: {
        type: String,
        required: true,
    },
    parentName: {
        type: String,
        required: true,
    },
    folder_name: {
        type: String,
        required: true,
    },
    childFiles: [],
    childFolders: [],
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

folder_schema.pre('save', function preSave(next) {
    var folder = this;
    folder.updatedAt = Date.now;
    next();
});

let folder_model = mongoose.model('folder_details', folder_schema);

module.exports = folder_model