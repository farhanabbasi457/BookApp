
const express = require("express");
const cors=require("cors");
const bodyparser=require("body-parser");
const dotenv= require("dotenv");
dotenv.config();
require("./config/config1");

const usersR = require("./routes/usersR");
const authorsR = require("./routes/authorR");
const bookmarksR = require("./routes/bookmarkR");
const booksR = require("./routes/booksR");
const categoriesR = require("./routes/categoriesR");
const readinghistoryR = require("./routes/readinghistoryR");


const app = express();

app.use(cors());
// Serve static files from the 'Pictures' directory
app.use(express.static('./public'));
app.use(bodyparser.json());



app.use("/books", booksR);
app.use("/author",authorsR);
app.use("/bookmark", bookmarksR);
app.use("/category", categoriesR);
app.use("/readinghistory", readinghistoryR); 
app.use("/user", usersR);


const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`service running on port ${port}`);
})