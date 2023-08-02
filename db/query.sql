SELECT 
    role.department_id AS name
FROM role
JOIN department ON role.department_id = department_id.id;

SELECT
    employee.role_id AS role
FROM employee 
JOIN role ON employee.role_id = role_id.id;
