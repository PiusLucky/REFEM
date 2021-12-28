const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserModelRouter = require("./routes/auth");
const ProfileRouter = require("./routes/profile");
const EmailModelRouter = require("./routes/sendMail");
const ResumeModelRouter = require("./routes/uploadResume");
const dotenv = require("dotenv");
const cors = require("cors");
const fileupload = require("express-fileupload");
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

// body-parser
app.use(bodyParser.json());

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:3000/dashboard',
    ],
    credentials: true,
};


app.use((cors(corsOptions)))



// cookie-parser
app.use(cookieParser());



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

// /Make Resume upload Mandatory
// What is difference between resume and CV?
// A resume is a one page summary of your work experience and background relevant to the job you are applying to. 
// A CV is a longer academic diary that includes all your experience, certificates, and publications.

// verify email https://mjml.io/try-it-live/Bzg8rGs9KLK

app.set("view engine", "ejs");

app.use("/api/v1/auth", UserModelRouter);
app.use("/api/v1/profile", ProfileRouter);
app.use("/api/v1/mail", EmailModelRouter);
app.use("/api/v1/resume-upload", ResumeModelRouter);


app.listen(5000);


module.exports = app
