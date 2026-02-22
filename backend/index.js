const express = require("express");
const app = express();
const port = 3000;

const { adminAuth, userAuth } = require("./src/Middlewares/auth");

app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
  //logic of checking, if the request is authorized
  res.send("Deleted a user");
});


//starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
