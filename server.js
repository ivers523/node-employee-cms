const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: process.env.PORT || 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employeeDB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  runPrompt();
});

function runPrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "start",
      message: "What would you like to do?",
      choices: [
        "View departments",
        "View roles",
        "View employees",
        "Add department",
        "Add role",
        "Add employee",
        "Exit"
      ]
    })
    .then(function (answer) {

      switch (answer.start) {
        case "View departments":
          viewDepartments();
          break;

        case "View roles":
          viewRoles();
          break;

        case "View employees":
          viewEmployees();
          break;

        case "Add department":
          addDepartment();
          break;

        case "Add role":
          addRole();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

// Create fxns for each case. should be recursive.
// IMPLEMENT "BACK" function
function viewDepartments() {
  inquirer
    .prompt({
      name: "inputdepartment",
      type: "input",
      message: "Please input a department name:"
    })
    .then(function (res) {
      const query = connection.query("SELECT * FROM department WHERE name=?", [`${res.inputdepartment}`], function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
          console.table(res);

        }
      }
      )
    }
    )
}

function viewRoles() {
  inquirer
    .prompt({
      name: "inputrole",
      type: "input",
      message: "Please input a role title:"
    })
    .then(function (res) {
      const query = connection.query("SELECT * FROM role WHERE title=?", [`${res.inputrole}`], function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
          console.table(res);

        }
      }
      )
    }
    )
}

function viewEmployees() {
  inquirer
    .prompt({
      name: "inputemployee",
      type: "input",
      message: "Please input an employee id:"
    })
    .then(function (res) {
      const query = connection.query("SELECT * FROM employee WHERE id=?", [`${res.inputemployee}`], function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
          console.table(res);

        }
      }
      )
    }
    )
}

// ADD function
// example for adding data
// function addRow() {
//     connection.query(`INSERT INTO items(name, price, category) VALUES("${name}", ${price}, "${category}");`, function (err, res) {
//         if (err) {
//             console.log(err)
//         }
//         console.log('Item added!! Bringing you back to home page.');
//         console.log("-----------------------------------");

//         firstPrompt();
//     });
// }