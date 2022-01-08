const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserModelRouter = require("./routes/auth");
const EmailModelRouter = require("./routes/sendMail");
const ProfileRouter = require("./routes/profile");
const ResumeModelRouter = require("./routes/uploadResume");
const dotenv = require("dotenv");
const cors = require("cors");
const fileupload = require("express-fileupload");
const cookieParser = require('cookie-parser');


dotenv.config();



const app = express();

// cookie-parser
app.use(cookieParser());

// body-parser
app.use(bodyParser.json());

const corsOptions = {
    // origin: process.env.NODE_ENV === 'production'?"https://refem.vercel.app":'http://localhost:3000',
    origin: "https://refem.vercel.app",
    credentials: true,
};


app.use((cors(corsOptions)))



// express fileupload
app.use(
    fileupload({
        useTempFiles: true,
    })
);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Database Connected Successfully!");
});


app.set("view engine", "ejs");

app.use("/api/v1/auth", UserModelRouter);
app.use("/api/v1/profile", ProfileRouter);
app.use("/api/v1/mail", EmailModelRouter);
app.use("/api/v1/resume-upload", ResumeModelRouter);


if(process.env.NODE_ENV === 'production'){
    const path = require('path')
    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dirname, 'client', 'refem-ui', 'build')))
        res.sendFile(path.resolve(__dirname,'client', 'refem-ui', 'build','index.html'))
    })
}



app.listen(5000);


module.exports = app
