var mongoose = require("mongoose");
var env = process.env.NODE_ENV || "development";
var config = require("./config/mongo")[env];
console.log(config);

module.exports = () => {
  var serverPort = process.env.PORT;
  var envUrl = process.env[config.use_env_variable];
  var localUrl = `mongodb://${config.host}/${config.database}`;
  //   var mongoUrl = envUrl ? envUrl : localUrl;
  let mongoUrl = process.env.MONGO_URL;
  console.log(mongoUrl);
  return mongoose.connect(mongoUrl);
};
