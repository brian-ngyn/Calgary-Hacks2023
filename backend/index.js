const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
var crypto = require("crypto");
var shasum = crypto.createHash("sha1");

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

app.post("/test", (req, res) => {
  console.log(req.body);
  res.send("test");
});

app.listen(3001, () => {
  console.log("server running port 3001");
});
