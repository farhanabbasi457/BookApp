const multer = require("multer");
const path =require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, path.join(__dirname, '../public/bookpic'));
        } else if (file.mimetype === 'application/pdf') {
            cb(null, path.join(__dirname, '../public/bookpdf'));
        } else {
            cb(new Error('Unsupported file type'));
        }
    },
    filename: function(req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    if ((file.fieldname === "cover_image" && (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) ||
        (file.fieldname === "pdf" && file.mimetype === 'application/pdf')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter
});