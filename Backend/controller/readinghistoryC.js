const readinghistory=require("../models/readinghistory");

exports.readinghistory=async (req, resp) => {
    const data = new readinghistory(req.body);
    const res = await data.save();
    console.log(res);
    if(res){
        resp.send({
            status:true,
            message:1
        });
    }
    else{
        resp.send({
            status:false,
            message:0
        });
    }
    
};
exports.readinghistoryput=async (req, resp) => {
    const { user_ID, book_ID } = req.query; 
    const data = await readinghistory.updateOne({ user_ID,book_ID },{$set:req.body}); //i->ignore all cases{
        if (data.matchedCount === 0) {
            resp.send({
                success: false,
                message: 0
            });
        } else {
            resp.send({
                success: true,
                message: 1
            });
        }
    
};
exports.readinghistoryget = async (req, resp) => {
    const { user_ID, book_ID } = req.query;
    const data = await readinghistory.find({ user_ID, book_ID });

    if (data.length === 0) {
        resp.send({
            status: true,
            message: 0
        });
    } else {
        resp.send({
            status: true,
            message: data
        });
    }
};