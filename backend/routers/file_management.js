const express = require('express');
const fs = require('fs');
const router = new express.Router();
const AWS = require('aws-sdk');
const file_model = require('../models/file')
const auth = require('../middleware/auth')
const path = require('path')

// configure aws and create a s3 object
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

// upload a file
router.post('/upload', auth, async (req, res, next) => {
    // const uploaded_list = req.files.uploaded_file_list;
    // let uploaded_file_list;
    // if (typeof (uploaded_list.length) === 'undefined') {
    //     uploaded_file_list = [uploaded_list];
    // } else {
    //     uploaded_file_list = uploaded_list;
    // }

    // for (let i = 0; i < uploaded_file_list.length; i++) {
    //     let file = uploaded_file_list[i];
    //     console.log(file)
    //     const file_content = Buffer.from(file.data, 'binary');
    //     const params = {
    //         Bucket: process.env.BUCKET_NAME,
    //         Key: file.name,
    //         Body: file_content
    //     };

    //     // insert file details in db
    //     const file_obj = {
    //         "key": params.Key,
    //         "bucket": params.Bucket,
    //         "isFav": false,
    //         "file_name": file.name,
    //         "owner": req.user._id,
    //     };

    //     //console.log(file_obj);

    //     const model_obj = new file_model(file_obj);

    //     await model_obj.save((err, obj) => {
    //         if (err) console.log(err);
    //         console.log(obj);
    //     });

    //     s3.upload(params, (err, data) => {
    //         if (err) res.send("error");
    //         console.log(data)
    //     });
    // }

    const file = req.body.file;
    const userId = req.body._id;

    const file_content = Buffer.from(file.data, 'binary');

    const file_obj = {
        "key": params.Key,
        "bucket": params.Bucket,
        "isFav": false,
        "file_name": file.name,
        "owner": userId,
    };

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: file.name,
        Body: file_content
    };

    const model_obj = new file_model(file_obj);

    await model_obj.save((err, obj) => {
        if (err) console.log(err);
        console.log(obj);
    });

    s3.upload(params, (err, data) => {
        if (err) res.send("error");
        console.log(data)
    });


    res.send('Successfully uploaded ' + "req.files.uploaded_file_list.length" + ' files!')
});

// download a file
router.get('/download/:file_id', auth, async (req, res) => {
    await file_model.find({ "file_id": req.params.file_id, "owner": req.user._id }, (err, file_detail) => {
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

// delete a file
router.delete('/files/:file_id', auth, async (req, res) => {
    const file_detail = await file_model.findOneAndDelete({ "file_id": req.params.file_id, "owner": req.user._id });

    const params = {
        Bucket: file_detail[0].bucket,
        Key: file_detail[0].key
    };

    s3.deleteObject(params, function (err, data) {
        if (err)
            console.log(err);
        else
            console.log("Successfully deleted file from bucket");
        console.log(data);
    });
});


// view files
router.get('/files', auth, async (req, res) => {
    await file_model.find({ "owner": req.user._id }, (ERR, file_list) => {
        res.send(file_list);
    });
});


module.exports = router