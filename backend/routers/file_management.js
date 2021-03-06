const express = require('express');
const fs = require('fs');
const router = new express.Router();
const AWS = require('aws-sdk');
const file_model = require('../models/file')
const path = require('path')

// configure aws and create a s3 object
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

// upload a file
router.get('/upload', (req, res) => {
    const filepath = "/Users/arijitroy/Desktop/Screenshot 2021-02-26 at 9.30.44 PM.png";
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: Date.now() + "_" + path.basename(filepath),
        Body: fs.createReadStream(filepath)
    };

    // upload file
    s3.putObject(params, (err, data) => {
        if (err) {
            console.log("upload error : ", err);
        } else {
            // insert file details in db
                const file_obj = {
                    "key": params.Key,
                    "bucket": params.Bucket,
                    "isFav": false,
                    "file_name": path.basename(filepath)
                };

                //console.log(file_obj);

                const model_obj = new file_model(file_obj);

                model_obj.save((err, obj) => {
                    if (err) console.log(err);
                });
        }
    });

    res.send("Successfully uploaded");
});

// download a file
router.get('/download/:file_id', (req, res) => {
    file_model.find({ "file_id": req.params.file_id }, (err, file_detail) => {
        const params = {
            Bucket: file_detail[0].bucket,
            Key: file_detail[0].key
        };

        // file location where the downloaded file will be saved
        const file_location = params.Key;
        res.attachment(file_location);
        const read_stream = s3.getObject(params).createReadStream();
        read_stream.pipe(res);
    });
});

// view files
router.get('/files', (req, res) => {
    file_model.find({/* no condition */}, (ERR, file_list) => {
        res.send(file_list);
    });
});


module.exports = router