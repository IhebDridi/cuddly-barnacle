const multer = require("multer")
const gridfsStorage = require("multer-gridfs-storage")
const gridfsStream = require("gridfs-stream")
const methodOverride = require("method-override")


exports.fileFilterer = async (req,file,cb)=>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" ){
        cb(null,true)
    }else
    {
        cb(null,false)
    }

}

exports.storager =multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"../upload/")
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})