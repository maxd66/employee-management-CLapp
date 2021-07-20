const { beforeAll } = require('@jest/globals');
const { connect } = require('http2');
const Ask = require('./lib/Ask');
const Callback = require('./lib/Callback');

const mainMenu = () => {
    const question = [{
        name: 'menuChoice',
        message: 'Welcome to the employee management app! Please select what you would like to do:',
        type: 'list',
        choices: ['Add department', 'Add role', 'Add employee', 'View department', 'View role', 'View employee', 'Update employee role', 'exit']
    }]
    const cb = (ans) => {
        const choice = ans.menuChoice;
        switch (choice) {
            case 'Add department':
                break;
            case 'Add role':
                break;
            case 'Add employee':
                break;
            case 'View department':
                break;
            case 'View role':
                break;
            case 'View employee':
                break;
            case 'Update employee role':
                break;
            case 'exit':
                break;
        }
    }
}