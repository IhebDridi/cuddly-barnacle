const mongoose = require("mongoose");
const VersionSchema = new mongoose.Schema({
    Project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
        versionName:{type:String,required:true},
        MqNumber:{type:Number,required:false},
        MqBank:{type:Object,required:false},
        date_of_creation: {required:false,type:Date,default:Date.now()}
    }
);
module.exports = mongoose.model("Version", VersionSchema,"Version");