const express = require("express");
const mysql = require("mysql");
const dbConfig = require("./database.js");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const connection = mysql.createConnection(dbConfig);

const app = express();
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.set("port", process.env.PORT || 5000);

app.post("/login", (req, res) => {});

app.listen(5000);
