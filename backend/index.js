const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const User = require("./src/models/user");
const { validateSignupData } = require("./src/utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //create  a JWT token, to hide the data inside the token, "999@Ramit" is a secret key as a password
      const token = await jwt.sign({ _id: user._id }, "999@Ramit", {
        expiresIn: "1d",
      }); 

      // add the token to cookie and send the response back to the user
      res.cookie("token", token);
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
app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;

    //object destructuring (const token = cookies.token)
    const { token } = cookies;
    //if token is not present
    if (!token) {
      throw new Error("Invalid Token");
    }

    //validate my token
    const decodedMessage = await jwt.verify(token, "999@Ramit");

    const { _id } = decodedMessage;
    // console.log("Logged In user is: " + _id);

    const user = await User.findById(_id);
    //if token is valid and user does not exist
    if (!user) {
      throw new Error("User does not exist");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.findOne({ emailId: userEmail });
    //when we didn't found user
    if (!users) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Feed API - get/print all the users form the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//delete user API - deleting a user by its id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId; //read data

  try {
    //const user = await User.findByIdAndDelete({_id: userId}); //useId is not in models so we can use like this also
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted succesfully!");
  } catch (err) {
    res.status(400).send("something went wrong!!");
  }
});

// patch/update user API - updating the data of user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId; //find and read userID
  const data = req.body; //read the whole data

  try {
    //Things, which are allowed to update for user
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "skills", "age"];

    //k(keys) -> every key present in the allowed updates
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    }); //return the documents before updates
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Update Failed" + err.message);
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
