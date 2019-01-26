var orm = require("../config/orm.js");

var burger = {
  selectAll: (callback) => {
    orm.selectAll("burgers", (res) => {
      callback(res);
    });
  },
  insertOne: (cols, vals, callback) => {
    orm.insertOne("burgers", cols, vals, (res) => {
      callback(res);
    });
  },
  updateOne: (objColVals, condition, callback) => {
    orm.updateOne("burgers", objColVals, condition, (res) => {
      callback(res);
    });
  }
};

module.exports = burger;