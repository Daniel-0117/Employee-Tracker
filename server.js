const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');


const PORT = process.env.PORT || 3001;
const app = express();


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Toots',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//All of the statrt up questions
const actions = [
  {
    type: 'list',
    name: 'selections',
    message: 'Choose what you want to do?',
    choices: ['View all departments', 'View all employees', 'View all roles', 'Add an employee', 'Add a role', 'Add a department', 'Quit']
  }
];



//All the questions for the user to add a department, role, or employee
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
    type: 'input',
    name: 'role',
    message: 'What is the role of the employee you would like to add?'
  },
  {
    type: 'input',
    name: 'manager',
    message: 'Who is the manager of the employee you would like to add?'
  }
];

//All the funcions to view the departments, roles, or employees
function viewDepartments() {
  const sql = 'SELECT * FROM department';
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
}

function viewRoles() {
  const sql = 'SELECT * FROM role';
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
}

function viewEmployees() {
  const sql = 'SELECT * FROM employee';
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
}



//All the functions to add a department, role, or employee
function addDepartment() {
  inquirer.prompt(departQuestions).then((answers) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
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
  inquirer.prompt(employeeQuestions).then((answers) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [answers.firstName, answers.lastName, answers.role, answers.manager];
    db.query(sql, params, (err, result) => {
      if (err) throw err;
      console.log('Employee added!');
      init();
    });
  });
}

//Functions to update the employee roles
function updateEmployeeRole() {
  inquirer.prompt([updateEmployeeRole]).then((answers) => {
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [answers.role, answers.employee];
    db.query(sql, params, (err, result) => {
      if (err) throw err;
      console.log('Employee role updated!');
      init();
    });
  });
}


//Function to present the user with the options
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
});

init();