let dotenv = require("dotenv");
dotenv.config();
let serverPort = process.env.PORT;
let mongoUrl = process.env.MONGODB_URI;

let express = require("express");
let bodyParser = require("body-parser");
let db = require("./db");
let pricesController = require("./controllers/prices");

let app = express();

const cors = require("cors");
app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (request, response) {
  response.send("Hello API");
});

app.get("/prices", pricesController.all);

app.get("/prices/allToday", pricesController.allToday);

app.get("/prices/allToday/daySum", pricesController.daySum);

app.post("/prices", pricesController.create);

app.delete("/prices/:id", pricesController.delete);

db.connect(mongoUrl, function (err) {
  if (err) {
    return console.log(err);
  }
  app.listen(serverPort, function () {
    console.log("API app started");
  });
});
