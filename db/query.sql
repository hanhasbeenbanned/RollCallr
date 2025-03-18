-- queries.sql

-- 1. Get all employees with their roles and departments
SELECT 
    employees.id,
    employees.first_name,
    employees.last_name,
    roles.title AS role,
    departments.department_name AS department,
    roles.salary,
    employees.manager_id
FROM 
    employees 
JOIN 
    roles ON employees.role_id = roles.id
JOIN 
    departments ON roles.department_id = departments.id;

-- 2. Get all managers
SELECT 
    DISTINCT managers.id,
    managers.first_name,
    managers.last_name
FROM 
    employees
JOIN 
    employees AS managers ON employees.manager_id = managers.id;

-- 3. Get employees by department
SELECT 
    employees.first_name,
    employees.last_name,
    departments.department_name
FROM 
    employees 
JOIN 
    roles ON employees.role_id = roles.id
JOIN 
    departments ON roles.department_id = departments.id
ORDER BY 
    departments.department_name;

-- 4. Get total salary budget by department
SELECT 
    departments.department_name,
    SUM(roles.salary) AS total_budget
FROM 
    employees
JOIN 
    roles ON employees.role_id = roles.id
JOIN 
    departments ON roles.department_id = departments.id
GROUP BY 
    departments.department_name;

