const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        //email validation using regex
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //unique is for optimisation, not validation
        unique: true
    },
    Password: {
        required: true,
        type: String
    }
});
module.exports = mongoose.model("User", UserSchema);