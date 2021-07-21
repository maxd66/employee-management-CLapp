const inquirer = require('inquirer');
const cTable = require('console.table');

class Ask {
    validateName(name) {
        if (name.length > 30 || name.length < 1) {
            return false
        } else {
            return true
        }
    }

    validateInteger() {

    }

    askQuestion(question, cb) {
        inquirer
            .prompt(question)
            .then(cb)
    }
}

module.exports = Ask;