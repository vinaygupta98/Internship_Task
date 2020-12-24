const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.download('./User_records.csv');
  res.status(200);
});

app.listen(port, () => {
  console.log(`listing to port no, ${port}`);
});