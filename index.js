const inquirer = require('inquirer')
const mysql = require('mysql2')
const consoleTable = require('console.table')
require('dotenv').config();

const sql = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
)

function inquire() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Select an action',
        name: 'select',
        choices: [
          "View all Departments",
          "View all Roles",
          "View all Employees",
          "View Employees by Manager",
          "View Employees by Department",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
          "View Total Utilized Budget of Department"
        ]
      }]).then(function (res) {
        switch (res.select) {
          case "View all Departments":
            return viewDepartments();

          case "View all Roles":
            return viewRoles();

          case "View all Employees":
            return viewEmployees();

          // case "View Employees by Manager":
          //   viewEmployeesByManager();

          // case "View Employees by Department":
          //   viewEmployeesByDepartment();

          // case "Add Department":
          //   addDepartment();

          // case "Add Role":
          //   addRole();

          // case "Add Employee":
          //   addEmployee();

          // case "Update Employee Role":
          //   updateEmployeeRole();

          // case "Update Employee Manager":
          //   updateEmployeeManager();

          // case "Delete Department":
          //   deleteDepartment();

          // case "Delete Role":
          //   deleteRole();

          // case "Delete Employee":
          //   deleteEmployee();

          // case "View Total Utilized Budget of Department":
          //   viewBudget();
        }
      })
};

inquire();

function anotherQuery() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to perform another query?",
        name: "anotherQuery",
        choices: [
          'Yes',
          'No'
        ]
      }
    ]).then(function (res) {
      switch (res.select) {
        case "Yes":
          inquire();
        case "No":
          process.exit()
      }
    })
}

function viewDepartments() {
  const showDepartment = () => {
    sql.query("SELECT * FROM department;", (err, results) => { console.log(consoleTable.getTable(results)) });
    setTimeout(() => {
      anotherQuery();
    }, 1000)
  }
  showDepartment();
}


function viewRoles() {
  const showRole = () => {
    sql.query("SELECT id, title, salary, department_id FROM roles;",
     (err, results) => { console.log(consoleTable.getTable(results)) });
    setTimeout(() => {
      anotherQuery();
    }, 1000);
  }
  showRole()
}

function viewEmployees() {
  const showEmployees = () => {
    sql.query("SELECT id, first_name, last_name, role_id, manager_id FROM employee;",
     (err, results) => { console.log(consoleTable.getTable(results)) });
    setTimeout(() => {
      anotherQuery();
    }, 1000);
  }
  showEmployees()
}

