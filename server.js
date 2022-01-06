const express = require("express");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("./middleware/asyncWrapper");
const ErrHandler = require("./middleware/err");
const notfound = require("./middleware/notfound");
const app = express();

app.use(express.json());
// app.use(notfound);

const db = [
  { email: "hsri@gmail.com", password: "hari1234" },
  { email: "hsri1@gmail.com", password: "hari1234" },
];

app.get("/users", (req, res) => {
  res.json(db);
});

const finduser = (email) => {
  const findObj = db.filter((res) => res.email === email);
  return new Promise((resolve, rej) => {
    if (findObj.length > 0) {
      return resolve(findObj);
    } else {
      return rej({ message: "user not found" });
    }
  });
};

app.get(
  "/users/:id",
  asyncWrapper(async (req, res) => {
    const email = req.params.id;
    const findObj = await finduser(email);
    const token = jwt.sign({ findObj }, "sdfsdfsdf", {
      expiresIn: "30 days",
    });
    res.json(token);
  })
);

app.use(ErrHandler);

app.get("/auth/:id", (req, res) => {
  const tokenVerify = req.params.id;

  const toke = jwt.verify(tokenVerify, "sdfsdfsdf", { expiresIn: "30 days" });
  res.json(toke);
});
app.get("/login", (req, res) => {
  const findObj = db.findIndex((res) => res.email === "hsri1@gmail.com");
  console.log(db[findObj]);
  res.json(db);
});

app.listen(3000, () => {
  console.log("listing on port 3000");
});
