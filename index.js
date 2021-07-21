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
  connection.query(`SELECT id, title FROM roles`, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    return res;
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
            console.log(`You successfully add a new department`);
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
            console.log(`You successfully add a new role`);
            mainMenu();
          });
        });
        break;

      case "Add employee":
        const roles = getRoles();
        const addEmployeeQuestion = [
          {
            name: "firstName",
            message:
              "What is the first name of the employee you would like to add?",
            type: "input",
          },
          {
            name: "salary",
            message:
              "What is the last name of the employee you would like to add?",
            type: "input",
          },
          {
            name: "role_id",
            message: "Please choose a role for this employee.",
            type: "list",
            choices: roleChoices,
          },
        ];
        ask.askQuestion(addEmployeeQuestion, (ans) => {
          for (i = 0; i < roles.length; i++) {
            if (ans.role_id === roles[i].title) {
              ans.role_id = roles[i].id;
            }
          }
          connection.query(`INSERT INTO department SET ?`, ans, (err, res) => {
            if (err) throw err;
            console.log(`You successfully add a new department`);
            mainMenu();
          });
        });
        break;

      case "View department":
        break;
      case "View role":
        break;
      case "View employee":
        break;
      case "Update employee role":
        break;
      case "exit":
        break;
    }
  };
  ask.askQuestion(question, cb);
};

connection.connect((err) => {
  if (err) throw err;
    mainMenu();
});
