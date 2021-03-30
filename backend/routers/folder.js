const express = require('express')
const fs = require('fs')
const router = new express.Router()
const folder_model = require('../models/folder')
const auth = require('../middleware/auth')
const path = require('path')

router.post('/folder', auth, async (req, res) => {
    const folder = req.body
    const folder_obj = new folder_model({
        'folder_name': folder.name,
        'parentId': folder.parentId,
        'parentName': folder.parentName,
        'owner': req.user._id
    })

    try {
        await folder_obj.save()

        if (folder.parentId != req.user.email) {
            const parent_obj = await folder_model.findOne({ '_id': folder.parentId, 'owner': req.user._id })
            parent_obj.childFolders.push(folder_obj)
            await parent_obj.save()
        }

        res.status(201).send(folder_obj)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/folder/:folder_id', auth, async (req, res) => {
    const id = req.params.folder_id
    const folder_obj = await folder_model.findOne({ '_id': id, 'owner': req.user._id })

    try {
        res.status(200).send(folder_obj)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/root/:email', auth, async (req, res) => {
    const email = req.params.email
    const folder_obj = await folder_model.findOne({ 'parentId': email, 'owner': req.user._id })

    try {
        res.status(200).send(folder_obj)
    } catch (e) {
        res.status(400).send(e)
    }
})

// rename folder
router.patch('/renamefolder/:folder_id', auth, async (req, res) => {
    const newName = req.body.newName;
    var folder = await folder_model.findOne({ "_id": req.params.folder_id, "owner": req.user._id })

    const parentId = folder.parentId
    var parent = await folder_model.findOne({ "_id": parentId, "owner": req.user._id })

    parent.childFolders.forEach((folder, index) => {
        if (folder._id == req.params.folder_id) {
            folder.folder_name = newName
        }
    });

    console.log(parent)
    parent.markModified('childFolders')
    parent.save()

    await folder_model.findOneAndUpdate({ "_id": req.params.folder_id, "owner": req.user._id }, { "folder_name": newName, "updatedAt": Date.now }, (ERR, folder) => {
        res.send(folder);
    });
});




module.exports = router