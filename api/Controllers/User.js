const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.Get_All_Users =  async (req,res) =>{
    const users = await User.find()
    res.status(200).json(users)
}

exports.Get_One_User =  async (req,res) =>{
    const user = await User.findOne({_id: req.params.userId})
    res.status(200).json(user)
}

exports.SignUp =  (req,res) =>{
    
    //try to find a user with the submitted email
    User.find({email: req.body.email}).exec().then(user =>{
        console.log("trying to sign up the new user")
        //if the user exist, exit with a message saying that it does
        if(user.length>=1){
            console.log("user exist")
            //409 conflict or 422 unprocessable entity
            res.status(409).json({message: "User exist"});
        }
        //if the user does not exist, start the process of creating one
        else{
            console.log("hashing")
            //Try to hash the submitted password
            bcrypt.hash(req.body.Password, 10, (err,hash) =>{
                //if an error occurs, status(500) is returned along side the error
                if(err){
                    console.log("error while hashing")
                    //hashing problem
                    return res.status(500).json({error: err});
                }
                //if the password has been successfully hashed, a user is created and saved in the database
                else{
                    console.log("creating user")
                    //creating user...
                    const user = new User({
                        email: req.body.email,
                        Password: hash,
                    });
                    console.log("saving user")
                    //saving...
                    user.save().then(result =>{
                        console.log("user saved")
                        res.status(201).json({message: result});
                    }).catch(err =>{
                        console.log("error while saving the user")
                        res.status(500).json({message: err});
                    });
                }
            })
        }
    }).catch(err =>{
        console.log("error")
        res.status(500).json({message: err.message})
    })
}

exports.Login = (req,res) =>{
    User.findOne({email: req.body.email})
    .then(user =>{
        if(!user){
            //not the best way to use 404, can encourage brute force attacks
            //user does not exist
            return res.status(401).json({message: "Authentication failed"})
        }
        bcrypt.compare(req.body.Password, user.Password, (err,result) =>{
            if(err){
                //error occured
                return res.status(401).json({message: "Authentication failed"})
            }
            if(result){
                //correct password
                const token = jwt.sign({
                    email: user.email,
                    _id: user._id
                }, process.env.SECRET, {expiresIn: "1h"})
                return res.status(200).json({
                    message: "Auth successfull",
                    token: token
                })
            }else{
                //wrong password
                return res.status(401).json({message: "Authentication failed"})
            }
        })
    })
    .catch(err =>{
        res.status(500).json({message: err})
    })
}

exports.delete_User = (req,res) =>{
    User.remove({_id: req.params.userId}).exec().then(result =>{
        res.status(200).json({message: result})
    }).catch(err =>{
        res.status(500).json({message: err})
    })
}