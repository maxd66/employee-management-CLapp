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
                      mainMenu();
                    })
                });
                break;

            case 'Add role':
                const addRoleQuestion = [{
                    name: 'title',
                    message: 'What is the title of the role you would like to add?',
                    type: 'input'
                },
                {
                    name: 'salary',
                    message: 'What is the salary this role receives?',
                    type: 'input'
                }, 
                {
                    name: 'department_id',
                    message: 'Please enter the department ID for this role.',
                    type: 'input'
                }]
                ask.askQuestion(addRoleQuestion, ans => {
                    const ansObj = {
                        title: ans.title, 
                        salary: parseInt(ans.salary), 
                        department_id: parseInt(ans.department_id)
                    };
                    connection.query(`INSERT INTO role SET ?`, ansObj, (err, res) => {
                      if (err) throw err;
                      console.log(`You successfully add a new role`)
                      mainMenu();
                    })
                });
                break;

            case 'Add employee':
                const addEmployeeQuestion = [{
                    name: 'name',
                    message: 'What is the name of the department you would like to add?',
                    type: 'input'
                    }]
                ask.askQuestion(addEmployeeQuestion, ans => {
                    connection.query(`INSERT INTO department SET ?`, ans, (err, res) => {
                    if (err) throw err;
                    console.log(`You successfully add a new department`)
                    mainMenu();
                    })
                });
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