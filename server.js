const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const errorHandler = require("errorhandler");

const neo4jSessionCleanup = require("./server/middlewares/neo4jSessionCleanup");
dotenv.config();

const api = express();
api.use(
  bodyParser.urlencoded({
    extended: true
  })
);
api.use(bodyParser.json());
api.use(cookieParser());
api.use(methodOverride());
api.use(errorHandler());

// CORS setting
api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

api.use(neo4jSessionCleanup);

api.get("/", function(req, res) {
  res.send("Hello World");
});

api.listen(process.env.SERVER_PORT, "localhost", () => {
  console.log(`[ OK ] Listening on port ${process.env.SERVER_PORT}`);
});
