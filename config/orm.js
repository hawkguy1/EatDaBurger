let connection = require("../config/connection.js");

function printQuestionMarks(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(obj) {
    let arr = [];
    for (let key in obj) {
        let value = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

let orm = {
    selectAll: (tableInput, callback) => {
        let queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },
    insertOne: (table, cols, vals, callback) => {
        let queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)});`;
        console.log(queryString);
        connection.query(queryString, vals, (err, result) => {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },
    updateOne: (table, objColVals, condition, callback) => {
        let queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition};`
        console.log(queryString);
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            callback(result);
        });
    }
};

module.exports = orm;