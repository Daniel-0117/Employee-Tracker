SELECT 
    role.department_id AS name
FROM role
JOIN department ON role.department_id = department_id.id;

SELECT
    employee.role_id AS job and employee.manager_id AS Manager
FROM role
LEFT JOIN employee
ON employee.role_id = role_id.id and employee.manager_id = manager_id.id;
-- ORDER BY employee.role_id;


