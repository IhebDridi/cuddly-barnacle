const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    try{    
        const decoded = jwt.verify(token, process.env.SECRET)
        req.userData = decoded;
        next();
    } catch(err){
        //wrong token
        return res.status(401).json({message: "Auth Failed"})
    }

}