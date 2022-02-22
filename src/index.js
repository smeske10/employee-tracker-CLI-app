const inquirer = require('inquirer')

function inquire () {
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
            viewDepartments();
            anotherQuery();
  
          case "View all Roles":
            viewRoles();
            anotherQuery();
  
          case "View all Employees":
            viewEmployees();
            anotherQuery();
          
          case "View Employees by Manager":
            viewEmployeesByManager();
            anotherQuery();
  
          case "View Employees by Department":
            viewEmployeesByDepartment();
            anotherQuery();
  
          case "Add Department":
            addDepartment();
            anotherQuery();
  
          case  "Add Role":
            addRole();
            anotherQuery();
  
          case "Add Employee":
            addEmployee();
            anotherQuery();
  
          case "Update Employee Role":
            updateEmployeeRole();
            anotherQuery();
  
          case "Update Employee Manager":
            updateEmployeeManager();
            anotherQuery();
  
          case "Delete Department":
            deleteDepartment();
            anotherQuery();
  
          case "Delete Role":
            deleteRole();
            anotherQuery();
  
          case "Delete Employee":
            deleteEmployee();
            anotherQuery();
  
          case "View Total Utilized Budget of Department":
            viewBudget();
            anotherQuery();
        }
      })
  };
  
  function anotherQuery(){
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
      }.then(function (res) {
        if (res.anotherQuery === 'Yes') {
          inquire();
        } else if (res.anotherQuery === 'No') {
          break;
        } else {
          return 'Please select a valid response'
        }
      }
      )
    ])
  }