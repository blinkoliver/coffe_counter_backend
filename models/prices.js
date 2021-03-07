let db = require("../db");
let ObjectID = require("mongodb").ObjectID;
let moment = require("moment");

exports.all = function (cb) {
  db.get()
    .collection("prices")
    .find()
    .toArray((err, docs) => cb(err, docs));
};

exports.allToday = function (cb) {
  db.get()
    .collection("prices")
    .find({
      date: {
        $gte: moment.utc(moment.utc()._d.setHours(0, 0, 0, 0))._d,
        $lt: moment.utc(moment.utc()._d.setHours(23, 59, 59, 999))._d
      }
    })
    .toArray((err, docs) => cb(err, docs));
};

exports.create = function (price, cb) {
  db.get()
    .collection("prices")
    .insertOne(price, (err, result) => {
      cb(err, result);
    });
};

exports.delete = function (id, cb) {
  db.get()
    .collection("prices")
    .deleteOne(
      { _id: ObjectID(id) },

      function (err, result) {
        cb(err, result);
      }
    );
};