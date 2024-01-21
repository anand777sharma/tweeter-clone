const express = require('express');
const upload = require("../middleware/FileUpload");
const { downloadFile, sendfilename } = require('../controllers/file_controller');

const router = express.Router();

router.post("/uploadFile", upload.single('file'), sendfilename);


router.get("/files/:filename", downloadFile);

module.exports = router;