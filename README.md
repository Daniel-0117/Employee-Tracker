# Employee-Tracker

Video Link: https://drive.google.com/file/d/143zf-znhPY4ZvSmgRXHTFirPj8PEoukE/view

[Screen shot of Application](./imgs/Screenshot%202023-08-01%20223711.png)

![Static Badge](https://img.shields.io/badge/MIT-license?label=license&labelColor=%2332CD30&color=%23A020F0&link=https%3A%2F%2Fopensource.org%2Flicense%2Fmit%2F)

## Description
This command line project was created so that employers will have an easy to understand database. That will perform functions such as viewing, adding, or updating all employees, departments, and roles. This way someone who is unfamilair with MySQL can query a database without the frustration one unversed with MySQL might rightfully have. 

## Usage
To begin the application the user must clone this repo. Then once properly cloned the user has to perform npm install into the integrated terminal. Once all modules are properly installed the application is truelly ready. Putting npm start to start the application there they will be presented with the all the options needed to run a database. 

  ## Table of Contents

- [Description](#description)

- [Usage](#usage)

- [Technologies used](#technologies-used)

- [Credits](#credits)

- [Team's Githubs](#team-githubs)

- [License](#license)

- [Project requirements](#project-requirements)


## Technologies used!
- MySQL
- Inquirer
- Node.js
- Console table

## Credits
Daniel Pacheco: https://github.com/Daniel-0117

## License
![Static Badge](https://img.shields.io/badge/MIT-license?label=license&labelColor=%2332CD30&color=%23A020F0&link=https%3A%2F%2Fopensource.org%2Flicense%2Fmit%2F)


## Acceptance Criteria:
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
### User Story!

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business