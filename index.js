//Eslint version:6

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require ("multer");
const path = require ("path");

const app = express();

dotenv.config();



mongoose.connect(process.env.MONGO_URL, {useNewUrlParser : true, useUnifiedTopology:true},()=>{
    console.log("Mongo is Connected");
});

app.use(function (req, res, next) {
    res.setHeader(
        "content-security-policy-report-only",
      
"default-src 'self';script-src 'report-sample''self';style-src 'report-sample' 'self';object-src 'none';base-uri 'self';connect-src 'self';font-src 'self';frame-src 'self';img-src 'self' https://1.bp.blogspot.com https://assets.thehansindia.com https://cdn.shopify.com https://cdn.wallpapersafari.com https://encrypted-tbn0.gstatic.com https://hindibate.com https://i.pinimg.com https://images.ctfassets.net https://static.independent.co.uk https://timesofindia.indiatimes.com https://upload.wikimedia.org https://wallpapercave.com https://www.ohyaaro.com https://www.pixelstalk.net;manifest-src 'self';media-src 'self';report-uri https://6168210e308a303bba427c30.endpoint.csper.io/;worker-src 'none';"

    );
    next();
  });
  


app.use("/images",express.static(path.join(__dirname,"public/images")));
app.use(express.static("public/images"));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"./public/images");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },
});

const upload = multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
        return res.status(200).json("File uploaded successfully.");
    }
    catch(err){
        console.log(err);
    }
})



app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

app.use(express.static(path.join(__dirname,"./client/build")));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/build', 'index.html'));
});

app.listen(process.env.PORT || 8080,function(){
    console.log("Server is running!");
});