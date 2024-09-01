const bookmarks=require("../models/bookmarks");

exports.bookmark=async (req, resp) => {
    const data = new bookmarks(req.body);
    const res = await data.save();

    if(data.length !=0){
        resp.send({
            status:true,
            message:1
        })
    }
};
exports.bookmarkget = async (req, resp) => {
    const { user_ID, book_ID } = req.query; 
    console.log(book_ID);
    const data = await bookmarks.find({ user_ID, book_ID });

    if (data.length === 0) {
        resp.send({
            status: true,
            message: 1
        });
    } else {
        resp.send({
            status: true,
            message: 0
        });
    }
};
exports.bookmarkdelete = async (req, resp) => {
    const { user_ID, book_ID } = req.query; 
    console.log(book_ID);
    const data = await bookmarks.deleteOne({ user_ID, book_ID });

    if (data.deletedCount === 1) {
        resp.send({
            status: true,
            message: 1
        });
    } else {
        resp.send({
            status: true,
            message: 0
        });
    }
};
