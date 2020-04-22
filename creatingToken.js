let result = "";
let characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let creatingToken = () => {
  for (let i = 0; i < 22; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
module.exports.creatingToken = creatingToken;