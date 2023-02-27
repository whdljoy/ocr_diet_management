const express = require("express");
const mysql = require("mysql");
const dbConfig = require("./database.js");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const connection = mysql.createConnection(dbConfig);
const { v4 } = require("uuid");
const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
let upload = multer({ dest: "public/uploads/" });

app.get("/users", (req, res) => {
  const params = req.query;
  const userData = `SELECT user.userUuid, email, password, name, nickname, weight, height, age, sex, BMR, purpose, exercise from user LEFT JOIN info ON user.userUuid = info.userUuid where user.userUuid="${params.userUuid}"`;

  connection.query(userData, (err, row) => {
    if (err) throw err;
    res.json(row[0]);
  });
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
  기초 대사량 계산 : (10 × 몸무게) + (6.25 × 키) – (5 × 나이)
  --남성: 기본식 ＋ 5
  --여성: 기본식 － 161

 */
app.post("/users", (req, res) => {
  const uuid = v4();
  const body = req.body;
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
    res.json(result[0]);
  });
});

app.use(express.static("public/uploads"));

function ocr(file) {
  const timestamp = new Date().getTime();
  const uuid = v4();
  const base64 = fs.readFileSync(file.path).toString("base64");
  axios
    .post(
      "https://12jvkdr39x.apigw.ntruss.com/custom/v1/20703/66ede7455e33baa0073a7ded373247895ae2419eb86a5cf3774382a3d305f389/general",
      {
        images: [
          {
            format: file.mimetype.split("image/")[1],
            name: file.originalname,
            data: base64,
          },
        ],
        lang: "ko",
        requestId: uuid,
        resultType: "string",
        timestamp: timestamp,
        version: "V1",
        enableTableDetection: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-OCR-SECRET": "TFl6c2JqYXZKVWZjcEtyRXZ0TmRFY0JQQnFqZmlTZGI=",
        },
      }
    )
    .then((res) => {
      console.log(res);

      return res.data;
    })
    .catch((e) => {
      console.log(e.response);
    });
}

app.post("/calendar/ocr", upload.single("image"), (req, res) => {
  const image = req.file;
  const timestamp = new Date().getTime();
  const uuid = v4();
  const base64 = fs.readFileSync(image.path).toString("base64");
  axios
    .post(
      "https://12jvkdr39x.apigw.ntruss.com/custom/v1/20703/66ede7455e33baa0073a7ded373247895ae2419eb86a5cf3774382a3d305f389/general",
      {
        images: [
          {
            format: image.mimetype.split("image/")[1],
            name: image.originalname,
            data: base64,
          },
        ],
        lang: "ko",
        requestId: uuid,
        resultType: "string",
        timestamp: timestamp,
        version: "V1",
        enableTableDetection: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-OCR-SECRET": "TFl6c2JqYXZKVWZjcEtyRXZ0TmRFY0JQQnFqZmlTZGI=",
        },
      }
    )
    .then((result) => {
      console.log(result.data);
      if (result.status === 200) {
        res.json(result.data.images[0].fields);
      }
    })
    .catch((e) => {
      console.log(e.response);
    });
});

app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
