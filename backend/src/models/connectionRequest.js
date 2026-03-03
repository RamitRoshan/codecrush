const mongoose = require("mongoose");

//Connection request schema
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      //reference to user collections
      ref: "User", //building relation btw 2 schemas
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
      },
    },
  },
  { timestamps: true },
);

//compound index, to make it fast with fromUserId we have to add toUserId
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;
  //before saving,it will check if the fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You Cannot send connection request to yourself!");
  }
  //this is kind of middleware so call next();
  //   next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequestModel",
  connectionRequestSchema,
);
module.exports = ConnectionRequestModel;
