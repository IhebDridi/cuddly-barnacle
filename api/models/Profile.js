const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    tel: {type: Number, required: false}
})

module.exports = mongoose.model("Profile", ProfileSchema)