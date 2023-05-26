const path = require("path");
const express = require("express");
const api = require("./api");
const app = express(); // create express app
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'client/build')));

app.post("/googelapi/sheets", (req, res) => {
  api(req, res);
});

app.get("/", (req, res) => {
  res.send(path.join(__dirname, 'client/build'))
});

app.listen(PORT, () => {
  console.log("server started on port "+PORT);
});
