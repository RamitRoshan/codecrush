const express = require("express");
const app = express();
const port = 3000;

// app.use("/user", (req, res) => {
//   res.send("Hello from the Dashboard");
// });

app.get("/user:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Ramit", lastName: "Roshan" });
});

app.post("/user", (req, res) => {
  res.send("Data successfully saved to the database");
});

//starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
