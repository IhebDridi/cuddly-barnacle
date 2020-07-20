const Project = require("../models/Projects")
const mongoose = require("mongoose")
const User = require("../models/User")
const Version = require("../models/versions")
const Model = require("../models/models")


exports.Add_New_Project = async (req,res) =>{
    try{
    const user = await User.findOne({email:req.body.email});
    const ProjectCheck = await Project.findOne({User: user._id,ProjectName:req.body.ProjectName})
        if(!ProjectCheck)
        {
        const project = new Project({
            ProjectName: req.body.ProjectName,
            //ProjectImage:req.file.path,
            ProjectImage:req.body.ProjectImage,
            User: user._id
        })
        project.save()
        .then(result =>{
            res.status(201).json({message: result})
        })
        
        .catch(err =>{
            res.status(500).json({message: err})
        })
        }
        else
        {
            res.status(409).json({message: "for this user, a project by this name already exists"})
        }
    }
    catch(e)
    {
        res.status(404).json({message: "a user by the email you inputed cannot be found"})
    }

}

exports.show_One_Project = async (req,res) =>{
    try{
    const user = await User.findOne({email: req.body.email})
    const project = await Project.findOne({ProjectName:req.body.ProjectName,User: user._id})
    const version = await Version.find({Project:project._id,User: user._id})
        if(version.length>0)
        {
            modelsList = []
            console.log("versions exist")
            for (let index = 0; index < version.length; index++) {
                const element = version[index];
                const model = await Model.find({version: element._id,Project: project._id,User: user._id})
                SingleModelObject = {
                    versionName: element.versionName,
                    modelsList: model
                }
                modelsList.push(SingleModelObject)
                
            }
            res.status(200).json({Project: project, modelsList: modelsList})
            
        }
        else
        {
            res.status(200).json({Project: project,message: "there are no versions nor models in this project"})
        }
        // if(version.length>0)
        // {
        //     console.log("versions exist exist")
        //     var lister = [];
        //     for (let index = 0; index < version.length; index++) {
        //         const model = await Model.find({version:version[index]._id})
        //         lister = lister.push(model)
        //         console.log(model)
        //         lister.push(model)
        //         version.push(model)
        //         console.log(lister[index],"from lister")
        //         //lister = model[index]
        //         //const element = array[index];
                
        //     }
        //     //const model = await Model.find({version:version[0]._id})
        //         console.log("models exist")
        //         const Projects = {"Project":project,"Versions":version,"Models":lister}
        //         console.log("versions found")
        //         res.json(Projects)

        // }
    }
    catch(e)
    {
        res.status(404).json({message: "something went wrong, please check the informations you have given"})
    }
}

exports.Show_All_Projects_One_User = async (req,res) =>{
    const user = await User.findOne({email:req.body.email});
    const projects = await Project.find({User: user._id})
    
    if(projects.length>0)
    {
        const versions = []
        const trueModels = []
        console.log("projects exist")
        for (let index = 0; index < projects.length; index++) {
            const version = await Version.find({Project: projects[index]._id})
            if (version.length >0)
            {
                const models = []
                console.log("versions exist")
                versions.push(version)

                for (let index2 = 0; index2 < version.length; index2++) {
                    const model = await Model.find({version: version[index2]._id})
                    if(model.length>0)
                    {
                        console.log("models exist")
                        models.push(model)
                    }
                }
                trueModels.push(models)
            }
            console.log("in project named: "+projects[index].ProjectName)
            
        }
        
        res.status(200).json({Projects : projects,Versions: versions, Models: trueModels} )
        
        res.status(200).json(projects)
        
    }
    
    else
    {
        res.status(404).json({message: "no Projects found for this user"})
        
    }
}
/*
exports.Add_New_Version = async (req,res) =>{
    var user = await User.findOne({"email":req.body.email});
    var projectexist = await Project.findOne({"ProjectName":req.body.ProjectName})


    

    if (User && projectexist)
    {
        var versions = []
        versions.push(projectexist.Project.version,projectexist.Project.version.models)
        console.log(versions)
        //console.log(req.body.Project.version[0].models[0].ProjectModelName)
        //console.log(projectexist)
        const project = new Project({
            ProjectName : projectexist.ProjectName,
            User: user._id
        })
        console.log(project)

        project.save()
        .then(result =>{
            res.status(201).json({message: result})

        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
    }
    console.log("no")

}*/