const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",

  // May need to change port information for connection
  port: process.env.PORT || 8889,

  //  username
  user: "root",

  //  password / db name
  password: "root",
  database: "employeeDB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  runPrompt();
});
// main menu
function runPrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "start",
      message: "What would you like to do?",
      choices: [
        new inquirer.Separator(),
        "View departments",
        "View roles",
        "View employees",
        new inquirer.Separator(),
        "Add department",
        "Add role",
        "Add employee",
        new inquirer.Separator(),
        "Update employee",
        new inquirer.Separator(),
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

        case "Update employee":
          updateEmployee();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}
// Create fxns for each case. should be *recursive*.
function viewDepartments() {
  const query = connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    runPrompt();
  }
  )
}
function viewRoles() {
  const query = connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    runPrompt();
  }
  )
}
function viewEmployees() {
  const query = connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    runPrompt();
  }
  )
}
// ADD functions

// function to adding
function addDepartment() {
  // prompt for department keys
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the DEPT. ID of the department you would like to add?"
      },
      {
        name: "name",
        type: "input",
        message: "What is the name of the department you would like to add?"
      }
    ])
    .then(function (res) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          id: res.id,
          name: res.name,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was created!\n");
          // re-prompt the user 
          runPrompt();
        }
      );
    });
}

function addRole() {
  // prompt for role keys
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the ROLE ID of the role you would like to add?"
      },
      {
        name: "title",
        type: "input",
        message: "What is the title of the role you would like to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the annual salary of the role you would like to add?"
      },
      {
        name: "departmentid",
        type: "input",
        message: "What is the DEPT ID of the role you would like to add?"
      }
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          id: res.id,
          title: res.title,
          salary: res.salary,
          department_id: res.departmentid
        },
        function (err) {
          if (err) throw err;
          console.log("Your role was created!\n");
          // return to prompt
          runPrompt();
        }
      );
    });
}

function addEmployee() {
  // prompt for role keys
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the EMPLOYEE ID of the employee you would like to add?"
      },
      {
        name: "firstname",
        type: "input",
        message: "What is the first name of the employee you would like to add?"
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the last name of the employee you would like to add?"
      },
      {
        name: "roleid",
        type: "input",
        message: "What is the ROLE ID of the employee you would like to add?"
      },
      {
        name: "managerid",
        type: "input",
        message: "If your employee has a manager, please enter their EMPLOYEE ID. If no manager exists, enter 0." // need to fix this so entering 0 isn't required
      }

    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          id: res.id,
          first_name: res.firstname,
          last_name: res.lastname,
          role_id: res.roleid,
          manager_id: res.managerid
        },
        function (err) {
          if (err) throw err;
          console.log("Your employee was created!\n");
          // return to prompt
          runPrompt();
        }
      );
    });
}
// UPDATE employee
function updateEmployee() {
  console.log("Updating employee...\n");
  inquirer.prompt([
    {
      name: "employee",
      type: "input",
      message: "Enter the ID of the employee you'd like to update"

    },
    {
      name: "newemployee",
      type: "input",
      message: "Enter the updated employee ROLE ID"

    }
  ]).then(function (res) {
    const query = connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
          role_id: res.newemployee
        },
        {
          id: res.employee
        }
      ],
      function (err, res) {
        if (err) throw err;
        console.log("Employee updated\n");
        runPrompt();
      }
    )
  }
  )
}