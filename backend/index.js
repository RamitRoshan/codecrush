const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const port = 3000;



//db should be connected before starting the server
connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }) 
  .catch((err) => {
    console.error("Database cannot be connected");
  });

//starting the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
