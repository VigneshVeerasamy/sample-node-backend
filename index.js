//imports
const express = require("express");
const app = express();
const path = require("path");
const response = require("./jsonResponse");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//port
const portNumber = process.env.PORT || 9090;

// for static files
app.use(express.static(path.join(__dirname, "public")));
//starting the server

app.listen(portNumber, () => {
  console.log("started at: " + portNumber);
});

//for sample users
app.get("/api/allUser", (req, res) => {
  console.log("reques got!");
  res.status(200).send(response());
});

//signup or create account
app.post("/api/signup", (req, res) => {
  console.log(
    req.headers["username"],
    req.headers["email"],
    req.headers["password"]
  );
  res
    .status(201)
    .send(
      createUser(
        req.headers["username"],
        req.headers["email"],
        req.headers["password"]
      )
    );
});

//login
app.get("/api/login", (req, res) => {
  res.status(200).send(auth(req.headers["email"], req.headers["password"]));
});

// existing users
var users = [
  {
    id: "1",
    username: "robert downey",
    email: "robert@nomail.com",
    password: "Test@123",
  },
  {
    id: "2",
    username: "larson",
    email: "larson@nomail.com",
    password: "Test@123",
  },
  {
    id: "3",
    username: "Arjun",
    email: "Arjun@nomail.com",
    password: "Test@123",
  },
];
var idCount = 3;
// Check user exist
function auth(email, password) {
  var x = users.find((value) => checker(value, email, password));
  if (x != undefined) {
    return x;
  } else {
    return "Auth failed!";
  }
}

// checker
function checker(value, email, password) {
  console.log(value["username"]);
  console.log(value["password"]);
  if (value["email"] === email) {
    if (value["password"] === password) {
      console.log(email);
      console.log(password);
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// function to add users to the collection
function createUser(userName, email, password) {
  if (userName == "" || userName == null || userName == undefined) {
    return "userName required!";
  }
  if (email == "" || email == null || email == undefined) {
    return "email required!";
  }
  if (password === "" || password == null || password == undefined) {
    return "password required!";
  } else {
    idCount++;
    var newUser = {
      id: idCount.toString(),
      userName: userName,
      email: email,
      password: password,
    };
    users.push(newUser);

    return { user: newUser };
  }
}
