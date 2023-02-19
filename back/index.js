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
  기초 대사량 계산 : (10 × 몸무게) + (6.25 × 키) – (5 × 나이)
  --남성: 기본식 ＋ 5
  --여성: 기본식 － 161

 */
app.post("/users", (req, res) => {
  const uuid = v4();
  const body = req.body;
  console.log(body);
  const insertUser = `INSERT INTO user (userUuid,email,password,name,nickname) VALUES (?, ?, ?, ?, ?); `;
  const insertInfo = `INSERT INTO info (userUuid,weight,height,age,sex,exercise,BMR,purpose) VALUES (?, ?, ?, ?, ?, ?, ?, ?); `;
  let BMR = 10 * body.weight + 6.25 * body.height - 5 * body.age;
  if (body.sex === "MALE") {
    BMR = BMR + 5;
  } else {
    BMR = BMR - 161;
  }
  let user = [uuid, body.email, body.password, body.name, body.nickname];
  let info = [
    uuid,
    body.weight,
    body.height,
    body.age,
    body.sex,
    body.exercise,
    BMR,
    body.purpose,
  ];

  const userQuery = connection.format(insertUser, user);
  const infoQuery = connection.format(insertInfo, info);
  console.log(userQuery + infoQuery);
  connection.query(userQuery + infoQuery, (err) => {
    if (err) {
      res.send({
        msg: "예기치 않은 오류가 발생하였습니다.",
      });
      throw err;
    } else {
      return res.json({
        success: true,
      });
    }
  });
});

app.get("/users/login", (req, res) => {
  const params = req.query;
  const selectUser = `SELECT userUuid from user where email="${params.email}" and password="${params.password}"`;
  connection.query(selectUser, (err, result) => {
    if (err) throw err;

    console.log(selectUser);
    console.log(result);
    res.json({ ...result });
  });
});

app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
