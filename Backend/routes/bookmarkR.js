const express=require("express");
const router=express.Router();

const bookmarkC=require("../controller/bookmarkC");

router.post("/",bookmarkC.bookmark);
router.get("/",bookmarkC.bookmarkget);
router.delete("/",bookmarkC.bookmarkdelete);

module.exports=router;