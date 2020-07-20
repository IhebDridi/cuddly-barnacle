const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan")
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
console.log('mongo')
console.log(process.env.MONGODB)
console.log(process.env.MONGODB)

mongoose.connect(process.env.MONGODB,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true} , () =>{
    console.log("Connected to Database...",process.env.MONGODB)
})


//MiddleWare
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//to fix cors
app.use(cors());
app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method === "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods",'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    };
    next();
});

const UserRoutes = require('./api/routes/User');
const productRoutes = require("./api/routes/Product")
const ProfileRouter = require("./api/routes/Profile")
const ProjectRouter = require("./api/routes/Project")
const VersionRouter = require("./api/routes/Version")
const ModeltRouter = require("./api/routes/Models")

app.use("/Users",UserRoutes);
app.use("/Produc",productRoutes);
app.use("/ProfileData",ProfileRouter);
app.use("/ProjectData",ProjectRouter);
app.use("/versionData",VersionRouter);
app.use("/modelData",ModeltRouter)

//If the router is not valid
app.use((req, res, next) =>{
    const err = new Error("Invalid request, no router or unauthorised request");
    err.status = 404;
    next(err);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({message: error.message});
})


module.exports = app;