const express=require("express");
const router=express.Router();

const booksC=require("../controller/booksC")
const bookpicpdf = require("../middleware/bookpicpdf");

router.post("/", bookpicpdf.fields([{ name: 'cover_image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), booksC.bookspost);
router.get("/", booksC.booksget);
router.put("/:book_title", bookpicpdf.fields([{ name: 'cover_image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), booksC.booksupdate);
router.delete("/:book_title", booksC.booksdelete);
router.get("/:book_title", booksC.booksget);

module.exports = router;