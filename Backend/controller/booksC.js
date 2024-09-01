const { set } = require("mongoose");
const books=require("../models/books");

exports.bookspost = async(req, resp) => {
    try {
        const coverImagePath = req.files.cover_image ? `public\\bookpic\\${req.files.cover_image[0].filename}` : null;
        const pdfPath = req.files.pdf ? `public\\bookpdf\\${req.files.pdf[0].filename}` : null;

        const data = new books({ cover_image: coverImagePath, pdf: pdfPath, ...req.body });
        const result = await data.save();
        resp.send("Inserted Successfully");
    } catch (error) {
        console.error(error);
        resp.status(500).send("Internal Server Error");
    }
};

exports.booksget = async(req, resp) => {
    try {
        const data = await books.find({ title: { $regex: new RegExp(req.params.book_title, "i") } }).populate("author_ID").populate("category_ID");
        if (data.length != 0) {
            resp.send({
                success: true,
                message: data
            });
        } else {
            resp.send({
                success: false,
                message: "No books found for this Title"
            });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).send("Internal Server Error");
    }
};

exports.booksdelete = async(req, resp) => {
    try {
        const data = await books.deleteOne({ title: req.params.book_title });
        if (data.deletedCount === 0) {
            resp.send({
                success: false,
                message: data.deletedCount
            });
        } else {
            resp.send({
                success: true,
                message: data.deletedCount
            });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).send("Internal Server Error");
    }
};
exports.booksupdate = async(req, resp) => {
    try {
        const coverImagePath = req.files.cover_image ? `public\\bookpic\\${req.files.cover_image[0].filename}` : null;
        const pdfPath = req.files.pdf ? `public\\bookpdf\\${req.files.pdf[0].filename}` : null;

        const data = await books.updateMany({ title: req.params.book_title },{$set:{
            title:req.params.title,
            description:req.params.description,
            cover_image:coverImagePath,
            author_ID:req.params.author_ID,
            category_ID:req.params.category_ID,
            pdf:pdfPath
        }});
        if (data.matchedCount === 0) {
            resp.send({
                success: false,
                message: data.matchedCount
            });
        } else {
            resp.send({
                success: true,
                message: data.matchedCount
            });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).send("Internal Server Error");
    }
};