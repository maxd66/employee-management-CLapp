const Ask = require('./lib/Ask');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
    password: 'password',
    database: 'employee_management',
  });
  
const ask = new Ask;

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
                const addDeptQuestion = [{
                    name: 'name',
                    message: 'What is the name of the department you would like to add?',
                    type: 'input'
                }]
                ask.askQuestion(addDeptQuestion, ans => {
                    connection.query(`INSERT INTO department SET ?`, ans, (err, res) => {
                      if (err) throw err;
                      console.log(`You successfully add a new department`)
                      console.table(res)
                      mainMenu();
                    })
                });
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
    ask.askQuestion(question, cb);
}

connection.connect((err) => {
    if (err) throw err;
    mainMenu();
  });