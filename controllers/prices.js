let Prices = require("../models/prices");
let moment = require("moment");
let fetch = require("node-fetch");

exports.all = function (req, res) {
  Prices.all(function (err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};

exports.allToday = function (req, res) {
  Prices.allToday(function (err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};
exports.daySum = function (req, res) {
  Prices.allToday(function (err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
    let date = moment().format("D-MM-YYYY");
    let sum = docs
      .map((element) => element.price)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);
    fetch(
      `https://api.telegram.org/bot1169417385:AAGAFZgfiIdFUmzl3nQTmO1f9Ko0J9rIzsk/sendMessage?chat_id=-329538260&text= ${date} revenue ${sum} BYN`
    );
  });
};

exports.create = function (req, res) {
  const { body } = req;
  const price = { id: body.id, value: body.value, date: moment(body.date)._d };
  Prices.create(price, (err, result) => {
    if (err) {
      return res.sendStatus(500);
    } else {
      res.send(price);
    }
  });
};

exports.delete = function (req, res) {
  Prices.delete(req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
};
