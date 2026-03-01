const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const User = require("./src/models/user");
const { validateSignupData } = require("./src/utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./src/middlewares/auth");

const port = 3000;
require("dotenv").config();

//middleware
app.use(express.json());
//cookies middleware
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    //creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    //instance of model and using user.save(), user save data in the database model
    await user.save();
    res.send("User Added successfully!");
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

//login APIs
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //check email in db
    const user = await User.findOne({ emailId: emailId });
    //if user is not present
    if (!user) {
      throw new Error("Invalid credentials");
    }

    //check password is valid or not
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create  a JWT token, to hide the data inside the token, "999@Ramit" is a secret key as a password
      const token = await user.getJWT();

      // add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successful!!!!");
    } else {
      throw new Error("Invalid credentials");
    }

    //sanitise email
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//profile apis
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//send connection request APIs (hit the APIs only when user is loggedIn)
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //read the user
  const user = req.user;

  //sending a connection request
  console.log("sending a connection request");
  res.send(user.firstName + " sent the connection request");
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
