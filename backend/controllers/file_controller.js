
// controller to send file to the frontend as response
const sendfilename = (req, res) => {
    res.json({ "fileName": req.file.filename });
}
// controller to down load file
const downloadFile = (req, res) => {
    const fileName = req.params.filename;
    const path = __basedir + "/uploads/";

    res.download(path + fileName, (error) => {
        if (error) {
            res.status(500).send({ meassge: "File cannot be downloaded " + error })
        }
    })
}

module.exports = { downloadFile,sendfilename }