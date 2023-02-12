const express = require("express");
const mysql = require("mysql");
const dbConfig = require("./database.js");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connection = mysql.createConnection(dbConfig);
const { v4 } = require("uuid");
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("port", process.env.PORT || 5000);

// login
app.get("/login", (req, res) => {
  const params = req.query;
});

// User 정보를 반환
app.get("/user", (req, res) => {
  const params = req.query;
  connection.query(
    `SELECT UserUuid from user where email="${params.email}"`,
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});
// register - 회원 가입
/** 
 *email,
  password,
  name,
  nickname,
  weight,
  height,
  age,
  sex,
 */
app.post("/users", (req, res) => {
  console.log("+++++++++++++++++++++");
  const uuid = v4();
  const body = req.body;
  console.log(body);
  const insertUser = `INSERT INTO user (userUuid,email,password,name,nickname) VALUES (?)`;
  const insertInfo = `INSERT INTO info (userUuid,weight,height,age,sex) VALUES (?)`;
  let user = [uuid, body.email, body.password, body.name, body.nickname];
  let info = [uuid, body.weight, body.height, body.age, body.sex];
  connection.query(insertUser, [user], (err, rows) => {
    if (err) res.json({ status: err });
    return res.json({ status: "200" });
  });
  connection.query(insertInfo, [info], (err, rows) => {
    if (err) res.json({ status: err });
    return res.json({ status: "200" });
  });
});
app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
