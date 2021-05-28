const functions = require("firebase-functions");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const admin = require("firebase-admin");
const csrf = require("csurf");
const port = 3000;
const crsfMiddleware = csrf({ cookie: true });
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());
app.use(crsfMiddleware);

// app.get("/", (req, res) => {
//   res.send("Hello Mah Friend");
// });
app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});
app.get(["/", "/home", "/index"], (req, res) => {
  res.render("index.html");
});

app.get("/cart", (req, res) => {
  res.render("cart.html");
});
app.get("/profile", function (req, res) {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("profile.html");
    })
    .catch((error) => {
      res.redirect("/login");
    });
});
app.get("/signup", (req, res) => {
  res.render("signup.html");
});
app.get("/login", (req, res) => {
  res.render("login.html");
});
app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});

app.listen(port, () => console.log("Listening on port " + port));

exports.app = functions.https.onRequest(app);
