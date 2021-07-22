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
let employeeChoices = [];

const getRoles = () => {
  connection.query(`SELECT id, title FROM role`, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    res.forEach(({ title, id }) => {
      roleChoices.push({ name: title, value: id });
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
      deptChoices.push({ name: name, value: id });
    });
  });
};

const getEmployees = () => {
  connection.query("SELECT id, first_name FROM employee", (err, res) => {
    if (err) {
      console.log(err);
    }
    res.forEach(({ id, first_name }) => {
      employeeChoices.push({ name: first_name, value: id });
    });
  });
};

const mainMenu = () => {
  getEmployees();
  getRoles();
  getDept();
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
        "View departments",
        "View roles",
        "View all employees",
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
        const addEmployeeQuestion = [
          {
            name: "first_name",
            message:
              "What is the first name of the employee you would like to add?",
            type: "input",
          },
          {
            name: "last_name",
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

      case "View departments":
        connection.query("SELECT * FROM department", (err, res) => {
          if (err) {
            console.log(err);
          }
          console.table(res);
          console.log(
            "============================================================="
          );
          mainMenu();
        });
        break;

      case "View roles":
        connection.query("SELECT * FROM role", (err, res) => {
          if (err) {
            console.log(err);
          }
          console.table(res);
          console.log(
            "============================================================="
          );
          mainMenu();
        });
        break;
      // Needs to be updated to include title, salary and department for each employee
      case "View all employees":
        connection.query(
          "SELECT employee.id, first_name, last_name, title, salary, name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;",
          (err, res) => {
            if (err) {
              console.log(err);
            }
            console.table(res);
            console.log(
              "============================================================="
            );
            mainMenu();
          }
        );
        break;

      case "Update employee role":
        const updateRoleQuestion = [
          {
            name: "id",
            message: "Which employee would you like to update?",
            type: "list",
            choices: employeeChoices,
          },
          {
            name: "role_id",
            message: "Please choose a new role for this employee.",
            type: "list",
            choices: roleChoices,
          },
        ];
        ask.askQuestion(updateRoleQuestion, (ans) => {
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [{ role_id: ans.role_id }, { id: ans.id }],
            (err, res) => {
              if (err) {
                console.log(err);
              }
              console.log("This employee has been updated!");
              mainMenu();
            }
          );
        });
        break;

      case "exit":
        connection.end();
        break;
    }
  };
  ask.askQuestion(question, cb);
};

connection.connect((err) => {
  if (err) throw err;
  mainMenu();
});
