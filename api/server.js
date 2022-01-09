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
    origin: process.env.FRONTEND_LINK,
    credentials: true,
};


app.use(cors(corsOptions))



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

app.get('/',(req,res)=>{
   res.status(200).json({msg:"API Connected!"})
})
app.use("/api/v1/auth", UserModelRouter);
app.use("/api/v1/profile", ProfileRouter);
app.use("/api/v1/mail", EmailModelRouter);
app.use("/api/v1/resume-upload", ResumeModelRouter);


app.listen(process.env.NODE_ENV === "production"? process.env.PORT: 5000);


module.exports = app
