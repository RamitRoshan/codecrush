// const URI = "mongodb+srv://ramitroshan:TYFseLnRunGTNtik@codecrs.uw65imz.mongodb.net/"

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    //"mongodb+srv://ramitroshan:TYFseLnRunGTNtik@codecrs.uw65imz.mongodb.net/codeCrush"
    process.env.DB_URL
  );
};

module.exports = connectDB;
