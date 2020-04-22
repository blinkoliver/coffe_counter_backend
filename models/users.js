let db = require("../db");
let ObjectID = require("mongodb").ObjectID;

exports.all = function (cb) {
  db.get()
    .collection("users")
    .find()
    .toArray((err, docs) => cb(err, docs));
};

exports.create = function (user, cb) {
  db.get()
    .collection("users")
    .insert(user, (err, result) => {
      cb(err, result);
    });
};

exports.delete = function (id, cb) {
  db.get()
    .collection("users")
    .deleteOne(
      { _id: ObjectID(id) },

      function (err, result) {
        cb(err, result);
      }
    );
};