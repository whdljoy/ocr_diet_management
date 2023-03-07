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

app.get("/calendar/calories", (req, res) => {
  const params = req.query;
  const getCalories = `SELECT fat,carbohydrate,protein,calories, Day(date) as day from calories where userUuid="${params.userUuid}" and DATE_FORMAT(date, '%Y-%m')="${params.searchDate}"`;
  connection.query(getCalories, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

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
        version: "V2",
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
      console.log(result.data.images[0]);
      if (result.status === 200) {
        res.json(result.data.images[0]);
      }
    })
    .catch((e) => {
      console.log(e.response);
    });
});

app.post("/calendar/diet", (req, res) => {
  const body = req.body;
  const uuid = v4();
  const insertDiet = `INSERT INTO diet (dietUuid, userUuid,productName,carbohydrate,protein,fat,eachCalories,servingWT,date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?); `;
  let diet = [
    uuid,
    body.userUuid,
    body.productName,
    body.carbohydrate,
    body.protein,
    body.fat,
    body.eachCalories,
    body.servingWT,
    body.date,
  ];
  const dietQuery = connection.format(insertDiet, diet);

  const notExistQuery = `INSERT INTO calories (date, calories, userUuid,fat,carbohydrate,protein) SELECT "${body.date}", ${body.eachCalories}, "${body.userUuid}", ${body.fat}, ${body.carbohydrate}, ${body.protein} WHERE NOT EXISTS ( SELECT userUuid FROM calories WHERE userUuid="${body.userUuid}" and date="${body.date}"); `;
  const existQuery = `UPDATE calories SET carbohydrate = carbohydrate + ${body.carbohydrate}, protein = protein + ${body.protein}, fat= fat + ${body.fat}, calories = calories + ${body.eachCalories} WHERE EXISTS (SELECT exist.userUuid FROM ( SELECT userUuid FROM calories WHERE userUuid="${body.userUuid}" and date="${body.date}") as exist) and userUuid="${body.userUuid}" and date="${body.date}" ; `;
  connection.query(dietQuery + notExistQuery + existQuery, (err) => {
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

app.get("/calendar/diet", (req, res) => {
  const params = req.query;
  const selectDiet = `SELECT * from diet where userUuid="${params.userUuid}" and date="${params.date}"`;
  connection.query(selectDiet, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.put("/calendar/diet", (req, res) => {
  const body = req.body;
  const putDiet = `UPDATE diet SET count=${body.count} where dietUuid="${body.dietUuid}";`;
  const updateQuery = `UPDATE calories, (SELECT * FROM diet where dietUuid="${body.dietUuid}") as Target SET calories.carbohydrate = calories.carbohydrate +((${body.count} - Target.count) * Target.carbohydrate), calories.protein = calories.protein + ((${body.count} - Target.count) * Target.protein), calories.fat= calories.fat + ((${body.count} - Target.count)*Target.fat), calories.calories = calories.calories + ((${body.count} - Target.count)*Target.eachCalories) WHERE calories.userUuid=Target.userUuid and calories.date=Target.date; `;

  connection.query(updateQuery + putDiet, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.delete("/calendar/diet/:userUuid/:dietUuid", (req, res) => {
  const updateQuery = `UPDATE calories, (SELECT * FROM diet where userUuid="${req.params.userUuid}" and dietUuid="${req.params.dietUuid}") as Target SET calories.carbohydrate = calories.carbohydrate - (Target.carbohydrate * Target.count), calories.protein = calories.protein - (Target.protein* Target.count), calories.fat= calories.fat - (Target.fat* Target.count), calories.calories = calories.calories - (Target.eachCalories* Target.count) WHERE calories.userUuid="${req.params.userUuid}" and calories.date=Target.date; `;

  const deleteDiet = `DELETE from diet where userUuid="${req.params.userUuid}" and dietUuid="${req.params.dietUuid}"`;
  connection.query(updateQuery + deleteDiet, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
