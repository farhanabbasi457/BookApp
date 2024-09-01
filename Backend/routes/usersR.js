const express=require("express");
const router=express.Router();

const userC=require("../controller/usersC");

router.get("/",userC.usersTableget);
router.post("/",userC.userspost);
router.delete("/:email",userC.usersdelete);
router.get("/:state",userC.usersget);

module.exports=router;