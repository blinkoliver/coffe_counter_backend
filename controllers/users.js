let Users = require("../models/users");
let creatingToken = require("../creatingToken");

exports.all = function (request, response) {
  Users.all(function (err, docs) {
    if (err) {
      console.log(err);
      return response.sendStatus(500);
    }
    response.send(docs);
  });
};

exports.create = function (req, res) {
  let token = creatingToken.creatingToken();
  let user = { email: req.body.email, password: req.body.password, token };
  Users.create(user, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(user);
    console.log(user);
  });
};

exports.delete = function (request, response) {
  Users.delete(request.params.id, (err, result) => {
    if (err) {
      console.log(err);
      return response.sendStatus(500);
    }
    response.sendStatus(200);
  });
};
