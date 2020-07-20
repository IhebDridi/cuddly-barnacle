const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ProjectName:{type: String,required: true,unique: false},
    DateOfCreation: {required:false,type:Date,default:Date.now()},
    ProjectImage: {required:true,type:String}
});
module.exports = mongoose.model("Project", ProjectSchema,"Project");