let MongoClient = require("mongodb").MongoClient;
let duetPrices = process.env.DB_NAME;


let state = {
  db: null
};


exports.get = function() {
    return state.db;
  };

exports.connect = function(url, done) {
  if (state.db) {
    return done();
  }
  MongoClient.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },
    function(err, db) {
      if (err) {
        return done(err);
      }
      state.db = db.db(duetPrices);
      done();
    }
  );
};