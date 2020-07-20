const Project = require("../models/Projects")
const mongoose = require("mongoose")
const Version = require("../models/versions")
const User = require("../models/User")




exports.Add_New_Version = async (req,res) =>{
    try{
    const user = await User.findOne({email: req.body.email})
    const project = await Project.findOne({ProjectName:req.body.ProjectName,User: user._id});

        const versionCheck = await Version.findOne({User: user._id,Project:project._id,versionName: req.body.versionName})
        if(!versionCheck)
        {
        const version = new Version({
            versionName: req.body.versionName,
            MqNumber: req.body.MqNumber,
            MqBank: req.body.MqBank,
            Project: project._id,
            User: user._id

        })
        version.save()
        .then(result =>{
            res.status(201).json({message: result})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
        }
        else
        {
            res.status(409).json({message: "for this user and for this project, a version by the name you inputed already exist"})
        }
    
    }
    catch(ee)
    {
        res.status(404).json({message: "the user or the project cannot be found"})
    }

    

}

exports.Find_One_Version = async (req,res) =>{
    const user = await User.findOne({email: req.body.email})
    if(user)
    {
        console.log("User exist")
        const project = await Project.findOne({ProjectName:req.body.ProjectName});
        if(project)
        {
            console.log("Project exist")
            const version = await Version.findOne({versionName: req.body.versionName})
            if(version)
            {
                res.status(200).json(version)
            }
        }
    }
}

exports.Find_All_Versions = async (req,res) =>{
    const user = await Project.findOne({email: req.body.email})
    if(user)
    {
        console.log("User exist")
        const project = await Project.findOne({ProjectName:req.body.ProjectName});
        if(project)
        {
            const version = await Version.find({Project:project._id})
            if(version.length>0)
            {
                res.status(200).json(version)
            }
        }
    }
}