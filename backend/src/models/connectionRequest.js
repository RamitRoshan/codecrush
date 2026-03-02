const mongoose = require("mongoose");

//Connection request schema
const connectionRequestSchema = new mongoose.Schema({


    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{values} is incorrect status type`, //throw error, when anything else
        }
    }

}, {timestamps: true}) 


const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel", connectionRequestSchema);
module.exports = ConnectionRequestModel;