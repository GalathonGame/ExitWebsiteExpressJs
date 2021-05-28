const functions = require("firebase-functions");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const port = 3000;
const crsfMiddleware = csrf({ cookie: true });

app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());
app.use(crsfMiddleware);

// app.get("/", (req, res) => {
//   res.send("Hello Mah Friend");
// });
app.get(["/", "/home", "/index"], (req, res) => {
  res.render("index.html");
});

app.get("/cart", (req, res) => {
  res.render("cart.html");
});
app.get("/profile", (req, res) => {
  res.render("profile.html");
});
app.get("/signup", (req, res) => {
  res.render("signup.html");
});
app.get("/login", (req, res) => {
  res.render("login.html");
});
app.listen(port, () => console.log("Listening on port " + port));

exports.app = functions.https.onRequest(app);
