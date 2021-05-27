const functions = require("firebase-functions");

const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/public"));

// app.get("/", (req, res) => {
//   res.send("Hello Mah Friend");
// });
app.get(["/", "/home", "/index"], (req, res) => {
  res.render("index.html");
});
app.get("/cart", (req, res) => {
  res.render("cart.html");
});

app.listen(port, () => console.log("Listening on port " + port));

exports.app = functions.https.onRequest(app);
