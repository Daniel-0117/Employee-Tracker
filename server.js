const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table'); // Import console.table for formatted output

const PORT = process.env.PORT || 3001;
const app = express();

// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Toots',
  database: 'employee_db'
});

// Check database connection
db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the employee_db database.');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All the startup questions
const actions = [
  {
    type: 'list',
    name: 'selections',
    message: 'Choose what you want to do?',
    choices: ['View all departments', 'View all employees', 'View all roles', 'Add an employee', 'Add a role', 'Add a department', 'Update an employee role', 'Quit']
  }
];

// All the questions for the user to add a department, role, or employee
const departQuestions = [
  {
    type: 'input',
    name: 'department',
    message: 'What is the name of the department you would like to add?'
  }
];

const roleQuestions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the name of the role you would like to add?'
  },
  {
    type: 'input',
    name: 'salary',
    message: 'What is the salary of the role you would like to add?'
  },
  {
    type: 'input',
    name: 'department',
    message: 'Which department does this role belong to?'
  }
];

const employeeQuestions = [
  {
    type: 'input',
    name: 'firstName',
    message: 'What is the first name of the employee you would like to add?'
  },
  {
    type: 'input',
    name: 'lastName',
    message: 'What is the last name of the employee you would like to add?'
  },
  {
    type: 'list',
    name: 'role',
    message: 'Select the role of the employee:',
    choices: []
  },
  {
    type: 'list',
    name: 'manager',
    message: 'Select the manager of the employee:',
    choices: []
  }
];

// Function to fetch roles from the database
function fetchRoles() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id, title FROM role';
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.map(role => ({ name: role.title, value: role.id })));
      }
    });
  });
}

// Function to fetch employees (managers) from the database
function fetchManagers() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee';
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.map(employee => ({ name: employee.full_name, value: employee.id })));
      }
    });
  });
}

// All the functions to view departments, roles, or employees
function viewDepartments() {
  const sql = `
    SELECT
      department_name AS Department 
    FROM
      department`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
}

function viewRoles() {
  const sql = `
    SELECT 
      title AS Job_Title,
      salary AS Salary,
      department.department_name AS Department
    FROM 
      role
    LEFT JOIN
      department ON role.department_id = department.id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
}

function viewEmployees() {
  const sql = `
    SELECT 
      employee.first_name AS First_Name, 
      employee.last_name AS Last_Name,
      role.title AS Job_Title,
      role.salary AS Salary,
      department.department_name AS Department,
      CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
    FROM 
      employee
    LEFT JOIN 
      role ON employee.role_id = role.id
    LEFT JOIN
      department ON role.department_id = department.id
    LEFT JOIN
      employee AS manager ON employee.manager_id = manager.id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows); // Assuming you are using Node.js console.table for formatted output
    init(); // Continue program flow
  });
}

// All the functions to add a department, role, or employee
function addDepartment() {
  inquirer.prompt(departQuestions).then((answers) => {
    const sql = `INSERT INTO department (department_name) VALUES (?)`;
    const params = [answers.department];
    db.query(sql, params, (err, result) => {
      if (err) throw err;
      console.log('Department added!');
      init();
    });
  });
}

function addRole() {
  inquirer.prompt(roleQuestions).then((answers) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [answers.title, answers.salary, answers.department];
    db.query(sql, params, (err, result) => {
      if (err) throw err;
      console.log('Role added!');
      init();
    });
  });
}

function addEmployee() {
  Promise.all([fetchRoles(), fetchManagers()])
    .then(([roles, managers]) => {
      // Update choices in employeeQuestions
      employeeQuestions[2].choices = roles; // Roles
      employeeQuestions[3].choices = [{ name: 'None', value: null }, ...managers]; // Managers including None option

      inquirer.prompt(employeeQuestions).then(answers => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [answers.firstName, answers.lastName, answers.role, answers.manager];
        db.query(sql, params, (err, result) => {
          if (err) throw err;
          console.log('Employee added!');
          init();
        });
      });
    })
    .catch(err => {
      console.error('Error fetching roles or managers:', err);
    });
}

// Function to fetch employees for updating roles or managers
function fetchEmployees() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee';
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.map((employee) => ({ name: employee.full_name, value: employee.id })));
      }
    });
  });
}


// Function to update an employee's role
function updateEmployeeRole() {
  // Fetch employees and roles to populate the choices
  Promise.all([fetchEmployees(), fetchRoles()])
    .then(([employees, roles]) => {
      const questions = [
        {
          type: 'list',
          name: 'employeeId',
          message: 'Select the employee whose role you want to update:',
          choices: employees,
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'Select the new role for the employee:',
          choices: roles,
        },
        {
          type: 'list',
          name: 'managerId',
          message: 'Select the new manager for the employee:',
          choices: [{ name: 'None', value: null }, ...employees],
        },
      ];

      inquirer.prompt(questions).then((answers) => {
        const sql = `UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?`;
        const params = [answers.roleId, answers.managerId, answers.employeeId];

        db.query(sql, params, (err, result) => {
          if (err) throw err;
          console.log('Employee updated!');
          init();
        });
      });
    })
    .catch((err) => {
      console.error('Error fetching employees or roles:', err);
    });
}



// Function to present the user with the options
function init() {
  inquirer.prompt(actions).then((answers) => {
    if (answers.selections === 'View all departments') {
      viewDepartments();
    } else if (answers.selections === 'View all employees') {
      viewEmployees();
    } else if (answers.selections === 'View all roles') {
      viewRoles();
    } else if (answers.selections === 'Add an employee') {
      addEmployee();
    } else if (answers.selections === 'Add a role') {
      addRole();
    } else if (answers.selections === 'Add a department') {
      addDepartment();
    } else if (answers.selections === 'Update an employee role') {
      updateEmployeeRole();
    } else if (answers.selections === 'Quit') {
      console.log('Goodbye!');
      process.exit();
    }
  });
}

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
  console.log('You are lost in the sauce!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  init(); // Start the application after server starts
});
