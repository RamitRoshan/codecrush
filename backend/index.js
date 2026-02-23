const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const User = require("./src/models/user");
const port = 3000;
require("dotenv").config();

app.post("/signup", async (req, res) => {
  //creating a new instance of the User model
  const user = new User({
    firstName: "Ramit",
    lastName: "Roshan",
    emailId: "ramit@roshangmail.com",
    password: "ramit@123",
  });

  //instance of model and this .save() will save data in the database model
  try {
    await user.save();
    res.send("User Added successfully!");
  }catch(err){
    res.status(400).send("Error saving the user:" + err.message);
  }
});

//db should be connected before starting the server
connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

//starting the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
