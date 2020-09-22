var express = require('express');
var router = express.Router();

const upload = require('../services/file-upload');

const singleUpload = upload.single('image');

router.post('/file-upload', function(req, res) {
    singleUpload(req, res, function(err) {
        // Router.put send to the local user
        return res.json({'imageUrl': req.file.location});
    });
});

module.exports = router;