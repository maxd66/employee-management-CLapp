const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_management",
});

class Ask {
  validateLength(name) {
    if (name.length > 30 || name.length < 1) {
      return false;
    } else {
      return true;
    }
  }

  validateInteger(num) {
      if (!num) {
          return false;
      } else if (num) {
          return false
      } else {
          return true;
      }
  }

  askQuestion(question, cb) {
    inquirer.prompt(question).then(cb);
  }

  view(query, cb) {
    connection.query(query, (err,res) => {
        if(err) {console.log(err)}
        console.table(res)
        console.log('=============================================================');
    })
  }
}

module.exports = Ask;
