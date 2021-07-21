const inquirer = require("inquirer");
const cTable = require("console.table");

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
      } else if (num.includes(/^[A-Za-z]+$/)) {
          return false
      } else {
          return true;
      }
  }

  askQuestion(question, cb) {
    inquirer.prompt(question).then(cb);
  }
}

module.exports = Ask;
