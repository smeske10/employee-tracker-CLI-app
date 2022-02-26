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
          "View all department",
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
          case "View all department":
            return viewdepartment();

          case "View all Roles":
            return viewRoles();

          case "View all Employees":
            return viewEmployees();

          case "View Employees by Manager":
           return viewEmployeesByManager();

          case "View Employees by Department":
            return viewEmployeesByDepartment();

          case "Add Department":
            return addDepartment();

          case "Add Role":
            return addRole();

          case "Add Employee":
            return addEmployee();

          case "Update Employee Role":
            return updateEmployeeRole();

          case "Update Employee Manager":
            return updateEmployeeManager();

          case "Delete Department":
            return deleteDepartment();

          case "Delete Role":
            return deleteRole();

          case "Delete Employee":
            return deleteEmployee();

          case "View Total Utilized Budget of Department":
            return viewBudget();
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

function viewdepartment() {
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
    sql.query("SELECT * FROM employee;",
     (err, results) => { console.log(consoleTable.getTable(results)) });
    setTimeout(() => {
      anotherQuery();
    }, 1000);
  }
  showEmployees()
}

function viewEmployeesByManager() {
  const showEmployeesbyManager = () => {
    sql.query("SELECT * FROM employee LEFT JOIN roles ON employee.role_id = role.id LEFT JOIN department ON ;",
     (err, results) => { console.log(consoleTable.getTable(results)) });
    setTimeout(() => {
      anotherQuery();
    }, 100);
  }
  showEmployeesbyManager()
}


function viewEmployeesByDepartment() {
  const showEmployeesbyDepartment = () => {
    sql.query("SELECT employees.id,first_name,last_name,title,department,salary,employees.manager_id FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN department ON roles.department_id = department.id;", (err, results) => { console.log(consoleTable.getTable(results)) });
    setTimeout(() => {
      anotherQuery();
    }, 100);
  }
  showEmployeesbyDepartment()
}

function addDepartment() {
  const newDepartment = () => {
    return inquirer.prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Please enter a new Department name to add:"
      }
    ])
  }
  newDepartment()
    .then((data) => {
      sql.query(`INSERT INTO department(name) VALUES("${data.departmentName}")`, (err, results) => { console.log("Department Added") })
    })
    .then((data) => {
      sql.query(`SELECT *FROM department`, (err, results) => { console.log(consoleTable.getTable(results)) })
    })
    .then((data) => {
      setTimeout(() => {
        anotherQuery();
      }, 100);
    })
}

function addRole() {
  const newRole = () => {
    let addedRoles = []
    sql.query("select * from department", (err, results) => { addedRole(results) })
    function addedRole(value) {
      for (let i = 0; i < value.length; i++) {
        addedRoles.push({
          name: value[i]["department"],
          value: value[i]["id"]
        })
      }
    }
    return inquirer.prompt([
      {
        type: "input",
        name: "roleName",
        message: "Please enter a new role to add:"
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter this role's salary:"
      },
      {
        type: "list",
        name: "deptChoice",
        message: "Please select of the following:",
        choices: addedRoles
      }
    ])
  }
  newRole()
    .then((data) => {
      sql.query(`INSERT INTO roles(title, salary, department_id) VALUES("${(data.roleName)}","${data.salary}","${data.deptChoice}")`, (err, results) => {
        if (err) { throw err }
      })
    })
    .then((data) => {
      sql.query(`SELECT *FROM roles`, (err, results) => { console.log(consoleTable.getTable(results)) })
    })
    .then((data) => {
      setTimeout(() => {
        anotherQuery();
      }, 100);
    })
}

function addEmployee() {
  let addedEmployees = []
  sql.query("select * from employees", (err, results) => {
    if (err) { console.log(err) }
    addedEmployee(results)
  })
  function addedEmployee(value) {
    for (let l = 0; l < value.length; l++) {
      addedEmployees.push({
        name: value[l]["first_name"],
        value: value[l]["id"]
      })
    }
  }

  let rtd = []
  sql.query("select * from roles", (err, results) => { addRTd(results) })
  function addRTd(value) {
    for (let i = 0; i < value.length; i++) {
      rtd.push({
        name: value[i]["title"],
        value: value[i]["id"]
      })
    }
  }
  const newEmployee = () => {
    return inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter the new employee's first name."
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter the new employee's last name."
      },
      {
        type: "list",
        name: "deptChoice",
        message: "Please select a roll:",
        choices: rtd
      },
      {
        type: "list",
        name: "manager",
        message: "Please select a manager:",
        choices: addedEmployees
      }
    ])
  }
  newEmployee()
    .then((data) => {
      sql.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES("${data.firstName}","${data.lastName}","${data.deptChoice}","${data.manager}")`,
        (err, results) => { console.log("Employee Added") })
    })
    .then((data) => {
      sql.query(`SELECT employees.id,first_name,last_name,title,department,salary,employees.manager_id FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN department ON roles.department_id = department.id;`,
        (err, results) => { console.log(consoleTable.getTable(results)) })
    })
    .then((data) => {
      setTimeout(() => {
        anotherQuery();
      }, 100);
    })
}

function updateEmployeeRole() {
  let addedEmployees2 = []
  sql.query("SELECT * FROM employees", (err, results) => { updateaddedEmployees(results) })
  function updateaddedEmployees(value) {
    for (let l = 0; l < value.length; l++) {
      addedEmployees2.push({
        name: value[l]["first_name"],
        value: value[l]["id"]
      })
    }
  }

  let rtd2 = []
  sql.query("SELECT * FROM roles", (err, results) => { updateRTd(results) })
  function updateRTd(value) {
    for (let n = 0; n < value.length; n++) {
      rtd2.push({
        name: value[n]["title"],
        value: value[n]["id"]
      })
    }
  }
  const newEmployeeUpdate = () => {
    return inquirer.prompt([
      {
        type: "input",
        name: "test",
        message: "Changes are permanent, press enter to continue",
      },
      {
        type: "list",
        name: "chosenEmployee",
        message: "Please select an employee to change their role:",
        choices: addedEmployees2
      },
      {
        type: "list",
        name: "updatedRole",
        message: "Please select a new role:",
        choices: rtd2
      }
    ])
  }
  newEmployeeUpdate()
    .then((data) => {
      sql.query(`UPDATE employees SET role_id = ${data.updatedRole} WHERE id =${data.chosenEmployee}`,
        (err, results) => { console.log("Employee Updated") })
    })
    .then((data) => {
      sql.query(`SELECT employees.id,first_name,last_name,title,department,salary,employees.manager_id FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN department ON roles.department_id = department.id;`,
        (err, results) => { console.log(consoleTable.getTable(results)) })
    })
    .then((data) => {
      setTimeout(() => {
        anotherQuery();
      }, 100);
    })
}

function updateEmployeeManager() {
  let addedEmployees2 = []
  sql.query("SELECT * FROM employees", (err, results) => { updateaddedEmployees(results) })
  function updateaddedEmployees(value) {
    for (let l = 0; l < value.length; l++) {
      addedEmployees2.push({
        name: value[l]["first_name"],
        value: value[l]["id"]
      })
    }
  }

  let rtd2 = []
  sql.query("SELECT * FROM roles", (err, results) => { updateRTd(results) })
  function updateRTd(value) {
    for (let n = 0; n < value.length; n++) {
      rtd2.push({
        name: value[n]["title"],
        value: value[n]["id"]
      })
    }
  }
  const newEmployeeUpdate = () => {
    return inquirer.prompt([
      {
        type: "input",
        name: "test",
        message: "Changes are permanent, press enter to continue",
      },
      {
        type: "list",
        name: "chosenEmployee",
        message: "Please select an employee to change their role:",
        choices: addedEmployees2
      },
      {
        type: "list",
        name: "updatedRole",
        message: "Please select a new role:",
        choices: rtd2
      }
    ])
  }
  newEmployeeUpdate()
    .then((data) => {
      sql.query(`UPDATE employees SET role_id = ${data.updatedRole} WHERE id =${data.chosenEmployee}`,
        (err, results) => { console.log("Employee Updated") })
    })
    .then((data) => {
      sql.query(`SELECT employees.id,first_name,last_name,title,department,salary,employees.manager_id FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN department ON roles.department_id = department.id;`,
        (err, results) => { console.log(consoleTable.getTable(results)) })
    })
    .then((data) => {
      setTimeout(() => {
        anotherQuery();
      }, 100);
    })
}

function deleteDepartment() {
  const deletedDepartment = () => {
    return inquirer.prompt([
      {
        type: "input",
        name: "deptName",
        message: "Please enter a new Department name to add:"
      }
    ])
  }
  deletedDepartment()
    .then((data) => {
      sql.query(`DROP IF EXISTS department(department) VALUES("${data.deptName}")`, (err, results) => { console.log("Department Added") })
    })
    .then((data) => {
      sql.query(`SELECT *FROM department`, (err, results) => { console.log(consoleTable.getTable(results)) })
    })
    .then((data) => {
      setTimeout(() => {
        anotherQuery();
      }, 100);
    })
}

function deleteRole() {
  const deletedRole = () => {
    let deletedRolesList = []
    sql.query("select * from department", (err, results) => { deletedRoles(results) })
    function deletedRoles(value) {
      for (let i = 0; i < value.length; i++) {
        deletedRolesList.push({
          name: value[i]["department"],
          value: value[i]["id"]
        })
      }
    }
    return inquirer.prompt([
      {
        type: "input",
        name: "roleName",
        message: "Please enter a new role to add:"
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter this role's salary:"
      },
      {
        type: "list",
        name: "deptChoice",
        message: "Please select of the following:",
        choices: deletedRolesList
      }
    ])
  }
  deletedRole()
    .then((data) => {
      sql.query(`INSERT INTO roles(title, salary, department_id) VALUES("${(data.roleName)}","${data.salary}","${data.deptChoice}")`, (err, results) => {
        if (err) { throw err }
      })
    })
    .then((data) => {
      sql.query(`SELECT *FROM roles`, (err, results) => { console.log(consoleTable.getTable(results)) })
    })
    .then((data) => {
      setTimeout(() => {
        anotherQuery();
      }, 100);
    })
}

function deleteEmployee() {
  let addedEmployees = []
  sql.query("select * from employees", (err, results) => {
    if (err) { console.log(err) }
    addedEmployee(results)
  })
  function addedEmployee(value) {
    for (let l = 0; l < value.length; l++) {
      addedEmployees.push({
        name: value[l]["first_name"],
        value: value[l]["id"]
      })
    }
  }

  let rtd = []
  sql.query("select * from roles", (err, results) => { addRTd(results) })
  function addRTd(value) {
    for (let i = 0; i < value.length; i++) {
      rtd.push({
        name: value[i]["title"],
        value: value[i]["id"]
      })
    }
  }
  const deletedEmployee = () => {
    return inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter the new employee's first name."
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter the new employee's last name."
      },
      {
        type: "list",
        name: "deptChoice",
        message: "Please select a roll:",
        choices: rtd
      },
      {
        type: "list",
        name: "manager",
        message: "Please select a manager:",
        choices: addedEmployees
      }
    ])
  }
  deletedEmployee()
    .then((data) => {
      sql.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES("${data.firstName}","${data.lastName}","${data.deptChoice}","${data.managerChoice}")`,
        (err, results) => { console.log("Employee Added") })
    })
    .then((data) => {
      sql.query(`SELECT employees.id,first_name,last_name,title,department,salary,employees.manager_id FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN department ON roles.department_id = department.id;`,
        (err, results) => { console.log(consoleTable.getTable(results)) })
    })
    .then((data) => {
      setTimeout(() => {
        anotherQuery();
      }, 100);
    })
}

function viewBudget() {
  const budget = () => {
    let deletedRolesList = []
    sql.query("select * from department", (err, results) => { deletedRoles(results) })
    function deletedRoles(value) {
      for (let i = 0; i < value.length; i++) {
        deletedRolesList.push({
          name: value[i]["department"],
          value: value[i]["id"]
        })
      }
    }
  }
  budget()
  .then((data) => {
    setTimeout(() => {
      anotherQuery();
    }, 100);
  });
}
