const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const cookieParser = require("cookie-parser"); 

const port = 3000;
require("dotenv").config();

//middleware
app.use(express.json());
//cookies middleware
app.use(cookieParser());








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
