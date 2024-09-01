const express=require("express");
const router=express.Router();

const categoriesC=require("../controller/categoriesC");

router.get("/",categoriesC.categoriesTableget);
router.post("/",categoriesC.categoriespost);
router.put("/:category_name",categoriesC.categoriesupdate);
router.delete("/:category_name",categoriesC.categoriesdelete);
router.get("/:category_name",categoriesC.categoriesget);
module.exports=router;