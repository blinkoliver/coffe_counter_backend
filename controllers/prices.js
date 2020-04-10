let Prices = require("../models/prices");
let moment = require("moment");
let fetch = require("node-fetch");

exports.all = function (request, response) {
  Prices.all(function (err, docs) {
    if (err) {
      console.log(err);
      return response.sendStatus(500);
    }
    response.send(docs);
  });
};

exports.allToday = function (request, response) {
  Prices.allToday(function (err, docs) {
    if (err) {
      console.log(err);
      return response.sendStatus(500);
    }
    response.send(docs);
  });
};
exports.daySum = function (request, response) {
  Prices.allToday(function (err, docs) {
    if (err) {
      console.log(err);
      return response.sendStatus(500);
    }
    response.send(docs);
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

exports.create = function (request, response) {
  let price = { price: request.body.price, date: moment.utc()._d };
  Prices.create(price, (err, result) => {
    if (err) {
      console.log(err);
      return response.sendStatus(500);
    }
    response.send(price);
  });
};

exports.delete = function (request, response) {
  Prices.delete(request.params.id, (err, result) => {
    if (err) {
      console.log(err);
      return response.sendStatus(500);
    }
    response.sendStatus(200);
  });
};
