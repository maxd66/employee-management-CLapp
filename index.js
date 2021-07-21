const Ask = require("./lib/Ask");
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

const ask = new Ask();
let deptChoices = [];
let roleChoices = [];

const getRoles = () => {
  connection.query(`SELECT id, title FROM role`, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    res.forEach(({ title, id }) => {
        roleChoices.push({name: title, value: id });
      });
  });
};

const getDept = () => {
  connection.query(`SELECT id, name FROM department`, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    res.forEach(({ name, id }) => {
      deptChoices.push({name: name, value: id });
    });
  });
};

const mainMenu = () => {
  const question = [
    {
      name: "menuChoice",
      message:
        "Welcome to the employee management app! Please select what you would like to do:",
      type: "list",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View department",
        "View role",
        "View employee",
        "Update employee role",
        "exit",
      ],
    },
  ];
  const cb = (ans) => {
    const choice = ans.menuChoice;
    switch (choice) {
      case "Add department":
        const addDeptQuestion = [
          {
            name: "name",
            message:
              "What is the name of the department you would like to add?",
            type: "input",
          },
        ];
        ask.askQuestion(addDeptQuestion, (ans) => {
          connection.query(`INSERT INTO department SET ?`, ans, (err, res) => {
            if (err) throw err;
            console.log(`You successfully added a new department`);
            mainMenu();
          });
        });
        break;

      case "Add role":
        getDept();
        const addRoleQuestion = [
          {
            name: "title",
            message: "What is the title of the role you would like to add?",
            type: "input",
          },
          {
            name: "salary",
            message: "What is the salary this role receives?",
            type: "input",
          },
          {
            name: "department_id",
            message: "Please choose a department for this role.",
            type: "list",
            choices: deptChoices,
          },
        ];
        ask.askQuestion(addRoleQuestion, (ans) => {
          const ansObj = {
            title: ans.title,
            salary: parseInt(ans.salary),
            department_id: parseInt(ans.department_id),
          };
          connection.query(`INSERT INTO role SET ?`, ansObj, (err, res) => {
            if (err) throw err;
            console.log(`You successfully added a new role`);
            deptChoices = [];
            mainMenu();
          });
        });
        break;

      case "Add employee":
        const roles = getRoles();
        const addEmployeeQuestion = [
          {
            name: "first_name",
            message:
              "What is the first name of the employee you would like to add?",
            type: "input",
          },
          {
              name: "last_name",
              message: "What is the last name of the employee you would like to add?",
              type: "input"
          },
          {
            name: "role_id",
            message: "Please choose a role for this employee.",
            type: "list",
            choices: roleChoices,
          },
        ];
        ask.askQuestion(addEmployeeQuestion, (ans) => {
            const ansObj = {
                first_name: ans.first_name,
                last_name: ans.last_name,
                role_id: parseInt(ans.role_id),
              };
          connection.query(`INSERT INTO employee SET ?`, ansObj, (err, res) => {
            if (err) throw err;
            console.log(`You successfully added a new employee`);
            roleChoices = [];
            mainMenu();
          });
        });
        break;

      case "View department":
        connection.query('SELECT * FROM department', (err,res) => {
            if(err) {console.log(err)}
            console.table(res)
            console.log('=============================================================');
            mainMenu()
        })
        break;
      case "View role":
        connection.query('SELECT * FROM role', (err,res) => {
            if(err) {console.log(err)}
            console.table(res)
            console.log('=============================================================');
            mainMenu()
        })
        break;
      case "View employee":
        connection.query('SELECT * FROM employee', (err,res) => {
            if(err) {console.log(err)}
            console.table(res)
            console.log('=============================================================');
            mainMenu()
        })
        break;
      case "Update employee role":
        break;
      case "exit":
          connection.end()
        break;
    }
  };
  ask.askQuestion(question, cb);
};

connection.connect((err) => {
  if (err) throw err;
    mainMenu();
});
