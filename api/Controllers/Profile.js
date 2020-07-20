const Profile = require("../models/Profile")
const mongoose = require("mongoose")
const User = require("../models/User")


exports.Add_Profile_Data = async (req,res) =>{
    const user = await User.findOne({email:req.body.email});
    if (User)
    {
        const profile = new Profile({
            tel: req.body.tel,
            User: user._id
        })
        profile.save()
        .then(result =>{
            res.status(201).json({message: result})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
    }

}