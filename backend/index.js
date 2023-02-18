import { initializeApp } from 'firebase/app';

const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
var crypto = require("crypto");
var shasum = crypto.createHash("sha1");

const firebaseConfig = {
  apiKey: "AIzaSyCk2EiVsZaktoheg_lNBVpWTMLYYY7APOQ",
  authDomain: "calgary-hacks2023.firebaseapp.com",
  projectId: "calgary-hacks2023",
  storageBucket: "calgary-hacks2023.appspot.com",
  messagingSenderId: "768329700428",
  appId: "1:768329700428:web:df8816242f55570ef350e9",
  measurementId: "G-G7D6Q7V0M4"
};

const firebaseApp = initializeApp(firebaseConfig)


app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

app.post("/test", (req, res) => {
  populateDatabase();
});

app.listen(3001, () => {
  console.log("server running port 3001");
});


function populateFirestoreDatabase() {
  
}
