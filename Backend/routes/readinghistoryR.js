const express=require("express");
const router=express.Router();

const readinghistoryC=require("../controller/readinghistoryC");

router.post("/",readinghistoryC.readinghistory);
router.put("/",readinghistoryC.readinghistoryput);
router.get("/",readinghistoryC.readinghistoryget);


module.exports=router;