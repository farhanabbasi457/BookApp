const authors = require("../models/authors");
const books = require("../models/books");

exports.autherget = async (req, resp) => {
    try {
        const data = await authors.find({ name: { $regex: new RegExp(req.params.author_name, "i") } });
        if (data.length !== 0) {
            const a_id = data[0]._id;
            const bdata = await books.find({ author_ID: a_id }).populate("author_ID").populate("category_ID");
            if (bdata.length !== 0) {
                resp.send({
                    success: true,
                    message: bdata
                });
            } else {
                resp.send({
                    success: false,
                    message: "No books found for this Author"
                });
            }
        } else {
            resp.status(404).send("Author Not Found");
        }
    } catch (error) {
        console.error('Error fetching author data:', error);
        resp.status(500).send("Internal Server Error");
    }
};
exports.autherput = async (req, resp) => {
    try {
        const path = req.file ? `public\\authorpic\\${req.file.filename}` : null;

        const data = await authors.updateOne({ name: req.params.author_name },{$set:{
            name:req.params.name,
            biography:req.params.biography,
            photo:path
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
        console.error('Error fetching author data:', error);
        resp.status(500).send("Internal Server Error");
    }
};
exports.autherdelete = async (req, resp) => {
    try {
        const data = await authors.deleteOne({ name: req.params.author_name });
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
        console.error('Error fetching author data:', error);
        resp.status(500).send("Internal Server Error");
    }
};

exports.authorTableget = async (req, resp) => {
    try {
        const data = await authors.find({});
        if (data.length !== 0) {
            resp.send({
                success: true,
                message: data
            });
        } else {
            resp.send({
                success: false,
                message: "No authors found"
            });
        }
    } catch (error) {
        console.error('Error fetching authors:', error);
        resp.status(500).send("Internal Server Error");
    }
};

exports.autherpost = async (req, resp) => {
    try {
        console.log(req.body,req.file);
        const path = req.file ? `public\\authorpic\\${req.file.filename}` : null;
        if (!path) {
            return resp.status(400).send("Photo is required");
        }

        const data = new authors({ photo: path, ...req.body });
        
        await data.save();
        resp.send("Inserted Successfully");
    } catch (error) {
        console.error('Error adding author:', error);
        resp.status(500).send("Internal Server Error: " + error.message);
    }
};
