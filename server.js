/* eslint-disable prettier/prettier */
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const errorHandler = require("errorhandler");
const Neode = require("neode")
// eslint-disable-next-line no-unused-vars
const seedKnowledgeItemNodes = require("./server/seeds").seedKnowledgeItemNodes
const neo4jSessionCleanup = require("./server/middlewares/neo4jSessionCleanup");
var cors = require('cors');
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
api.use(cors());
api.options('*', cors())
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

// neode config
// const neodeInstance = new Neode.fromEnv()
const neodeInstance = new Neode(
  "bolt://localhost:7687/",
  process.env.NEO4J_USERNAME,
  process.env.NEO4J_PASSWORD
);

neodeInstance.withDirectory(__dirname + '/server/models')
seedKnowledgeItemNodes(neodeInstance)

api.use(neo4jSessionCleanup);

api.get("/", function(req, res) {
  res.send("Hello World");
});

api.use('/api/v1', require('./server/routes').knowledge_items(neodeInstance));

api.listen(process.env.SERVER_PORT, "localhost", () => {
  console.log(`[ OK ] Listening on port ${process.env.SERVER_PORT}`);
});
