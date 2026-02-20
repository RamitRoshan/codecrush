const express = require("express");
const app = express();
const port = 3000;

// app.use("/", (req, res) => {
//   res.send("Hello from the Dashboard");
// });

// app.use("/test", (req, res) => {
//   res.send("Hello from the code crush");
// });

// app.use("/main", (req, res) => {
//   res.send("another route");
// });
app.get("/", (req, res) => {
  res.send("Hello from the Dashboard");
});

app.get("/test", (req, res) => {
  res.send("Hello from the code crush");
});

app.get("/main", (req, res) => {
  res.send("another route");
});

//starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
