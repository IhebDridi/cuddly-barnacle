const mongoose = require("mongoose");
const ModelSchema = new mongoose.Schema({
    version: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Version",
        required: true
    },
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
    source: {type: String,required: true},
    numberOfPuces: {type:Number,required:true,default: 0},
    ProjectModelName: {type: String,required: true},
    annotations: {type: Object,required: true,default: {}},
    Content: {type: Object,required: false,default: {}},
    //PointsOfInterest: {type: Object,required: false},
    //PoiModals: {type: Object,required: false},
    //modelUrl: {type: String,required: true},
    dateOfCreation: {required:false,type:Date,default:Date.now()}
});
module.exports = mongoose.model("Model", ModelSchema,"Model");