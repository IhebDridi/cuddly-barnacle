const Version = require("../models/versions")
const Project = require("../models/Projects")
const User = require("../models/User")
const mongoose = require("mongoose")
const Model = require("../models/models")




exports.Add_New_Model = async (req,res) =>{
    //const version = await Version.findOne({versionName:req.body.versionName});

    //find the user
    try{

    
    const user = await User.findOne({email:req.body.email})
    //find the project from the name of the project and the user id
    const project = await Project.findOne({User: user._id,ProjectName: req.body.ProjectName})
    console.log(project)
    //find the version from the name of the version, the project id and the user id
    const version = await Version.findOne({User: user._id,Project: project._id,versionName:req.body.versionName});

    const modelCheck = await Model.findOne({User: user._id,Project: project._id,version: version._id,ProjectModelName: req.body.ProjectModelName})
    if(!modelCheck)
    {
        const model = new Model({
            ProjectModelName: req.body.ProjectModelName,
            source: req.body.source,
            annotations: req.body.annotations,
            numberOfPuces: req.body.numberOfPuces,
            annotations: req.body.annotations,
            //modelUrl: req.body.modelUrl,
            //PointsOfInterest: req.body.PointsOfInterest,
            //PoiModals: req.body.PoiModals,
            
            User: user._id,
            Project: project._id,
            version: version._id
        })
        model.save()
        .then(result =>{
            res.status(201).json({message: result})
        })
        .catch(err =>{
            //I propably should change this status, propably
            res.status(500).json({message: err})
        })
    
    }
    else
    {
        res.status(409).json({message: "a model by this name already exist in this version, in this project, for this exact user"})
    }
}
    catch(e)
    {
        res.status(404).json({meesage: "the email, the project name or the version name is wrong, please make sure you have inputed the correct credentials"})
    }

}

exports.Update_One_Model = async (req,res) =>{
    try{

    
        const user = await User.findOne({email:req.body.email})
        const project = await Project.findOne({User: user._id,ProjectName: req.body.ProjectName})
        console.log(project)
        const version = await Version.findOne({User: user._id,Project: project._id,versionName:req.body.versionName});
        const modelCheck = await Model.findOne({User: user._id,Project: project._id,version: version._id,ProjectModelName: req.body.ProjectModelName})
        if(modelCheck)
        {
            modelCheck.annotations = req.body.newAnnotations
            modelCheck.numberOfPuces = req.body.newNumberOfPuces
            modelCheck.save()
            .then(result =>{
                res.status(200).json({message: result})
            })
            .catch(err =>{
                res.status(500).json({message: "error "+err})
            })
        }
        else
        {
            res.status(404).json({message: "no such model exist"})
        }
    }
    catch(e)
    {
        res.status(404).json({message: "no such * exist"})
    }
}

exports.Update_One_Model_Content = async (req,res) =>{
    try{

    
        const user = await User.findOne({email:req.body.email})
        const project = await Project.findOne({User: user._id,ProjectName: req.body.ProjectName})
        console.log(project)
        const version = await Version.findOne({User: user._id,Project: project._id,versionName:req.body.versionName});
        const modelCheck = await Model.findOne({User: user._id,Project: project._id,version: version._id,ProjectModelName: req.body.ProjectModelName})
        if(modelCheck)
        {
            modelCheck.Content = req.body.newContent
            modelCheck.save()
            .then(result =>{
                res.status(200).json({message: result})
            })
            .catch(err =>{
                res.status(500).json({message: "error "+err})
            })
        }
        else
        {
            res.status(404).json({message: "no such model exist"})
        }
    }
    catch(e)
    {
        res.status(404).json({message: "no such * exist"})
    }
}





exports.Show_One_Model = async (req,res) =>{
    const version = await Version.findOne({versionName:req.body.versionName})
    if (version)
    {
        const model = await Model.findOne({versionName:req.body.versionName,ProjectModelName:req.body.ProjectModelName})
        if (model)
        {
            res.status(200).json({message: model})
        }
        else
        {
            res.status(404).json({message: "model not found"})
        }
    }
    else
    {
        res.status(404).json({message: "version not found"})
    }
}