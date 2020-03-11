const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
dotenv.config();

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cookieParser);
app.use(methodOverride);

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.listen(process.env.SERVER_PORT, "localhost");
console.log(`[ OK ] Listening on port ${process.env.SERVER_PORT}`);
