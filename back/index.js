const express = require("express");
const mysql = require("mysql");
const dbConfig = require("./database.js");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const connection = mysql.createConnection(dbConfig);

const app = express();
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.set("port", process.env.PORT || 3306);

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
app.post("/user", (req, res) => {
  const body = req.body;
  connection.query(`INSERT INTO user `);
});

app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
