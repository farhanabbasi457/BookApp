const express=require("express");
const router=express.Router();

const authorC=require("../controller/authorC");
const authorpic=require("../middleware/authorpic");

router.post("/post", authorpic.single("photo"), authorC.autherpost); 
router.get("/", authorC.authorTableget); 
router.put("/:author_name", authorpic.single("photo"), authorC.autherput); 
router.delete("/:author_name", authorC.autherdelete); 
router.get("/:author_name", authorC.autherget);


module.exports=router;