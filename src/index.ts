import inquirer from 'inquirer';
import * as dotenv from 'dotenv';
import { pool, connectToDb, disconnectToDb } from './connection.js';

dotenv.config();

console.log('Welcome to the Employee Tracker!');

type Employee = {
    id: number;
    first_name: string;
    last_name: string;
}

type Role = {
    id: number;
    title: string;
}

async function connect() {
    await connectToDb();
}

async function mainMenu() {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Quit'
        ],
    });

    switch (action) {
        case 'View All Employees':
            console.log('View All Employees');
            await viewAllEmployees();
            break;
        case 'Add Employee':
            console.log('Add Employee');
            await addEmployee();
            break;
        case 'Update Employee Role':
            console.log('Update Employee Role');
            await updateEmployeeRole();
            break;
        case 'View All Roles':
            console.log('View All Roles');
            await viewAllRoles();
            break;
        case 'Add Role':
            console.log('Add Role');
            await addRole();
            break;
        case 'View All Departments':
            console.log('View All Departments');
            await viewAllDepartments();
            break;
        case 'Add Department':
            console.log('Add Department');
            await addDepartment();
            break;
        case 'Quit':
            console.log('Thank you, have a great rest of your day!');
            await disconnectToDb();
            process.exit(0);
    }
}

const viewAllEmployees = async () => {
    try {
        
        const result = await pool.query(`
            SELECT e.id, e.first_name, e.last_name, r.title, d.department_name as department, r.salary, 
            CONCAT(m.first_name, ' ', m.last_name) as manager
            FROM employees e
            JOIN roles r ON e.role_id = r.id
             JOIN departments d ON r.department_id = d.id
             JOIN employees m ON e.manager_id = m.id
        `);
        console.table(result.rows);
    } catch (err) {
        console.error('Error viewing employees:', err);
    } 
    await mainMenu();
}

const addEmployee = async () => {
    try {
        // Get roles for choices
        const roleResult = await pool.query<Role>('SELECT id, title FROM roles');
        const roles = roleResult.rows.map((role: Role) => ({
            name: role.title,
            value: role.id
        }));

        // Get employees for manager choices
        const managerResult = await pool.query<Employee>('SELECT id, first_name, last_name FROM employees');
        const managers = managerResult.rows.map((emp: Employee) => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id
        }));
        // managers.unshift({ name: 'None', value: null });

        const answers = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: "What is the employee's first name?"
            },
            {
                name: 'lastName',
                type: 'input',
                message: "What is the employee's last name?"
            },
            {
                name: 'roleId',
                type: 'list',
                message: "What is the employee's role?",
                choices: roles
            },
            {
                name: 'managerId',
                type: 'list',
                message: "Who is the employee's manager?",
                choices: managers
            }
        ]);

        await pool.query(
            'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
            [answers.firstName, answers.lastName, answers.roleId, answers.managerId]
        );
        
        console.log('Employee added successfully!');
    } catch (err) {
        console.error('Error adding employee:', err);
    } 
    await mainMenu();
}

const updateEmployeeRole = async ()=> {
    try {
        
        
        // Get employees
        const empResult = await pool.query<Employee>('SELECT id, first_name, last_name FROM employees');
        const employees = empResult.rows.map((emp: Employee) => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id
        }));

        // Get roles
        const roleResult = await pool.query<Role>('SELECT id, title FROM roles');
        const roles = roleResult.rows.map((role: Role) => ({
            name: role.title,
            value: role.id
        }));

        const answers = await inquirer.prompt([
            {
                name: 'employeeId',
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: employees
            },
            {
                name: 'roleId',
                type: 'list',
                message: 'What is their new role?',
                choices: roles
            }
        ]);

        await pool.query(
            'UPDATE employees SET role_id = $1 WHERE id = $2',
            [answers.roleId, answers.employeeId]
        );

        console.log('Employee role updated successfully!');
    } catch (err) {
        console.error('Error updating employee role:', err);
    } 
    await mainMenu();
}

const viewAllRoles = async () => {
    try {
        
        const result = await pool.query(`
            SELECT r.id, r.title, d.department_name as department, r.salary
            FROM roles r
            LEFT JOIN departments d ON r.department_id = d.id
        `);
        console.table(result.rows);
    } catch (err) {
        console.error('Error viewing roles:', err);
    } 
    await mainMenu();
}

const addRole = async () => {
    try {
        
        
        // Get departments for choices
        const deptResult = await pool.query('SELECT id, department_name FROM departments');
        const departments = deptResult.rows.map((dept: {id: number; department_name: string;}) => ({
            name: dept.department_name,
            value: dept.id
        }));

        const answers = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the name of the role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for this role?',
                validate: (input: string) => !isNaN(Number(input))
            },
            {
                name: 'departmentId',
                type: 'list',
                message: 'Which department does this role belong to?',
                choices: departments
            }
        ]);

        await pool.query(
            'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)',
            [answers.title, answers.salary, answers.departmentId]
        );

        console.log('Role added successfully!');
    } catch (err) {
        console.error('Error adding role:', err);
    } 
    await mainMenu();
}

//#region viewAllDepartments
const viewAllDepartments = async () => {
    try {
        
        const result = await pool.query('SELECT id, department_name FROM departments');
        console.table(result.rows);
    } catch (err) {
        console.error('Error viewing departments:', err);
    } 
    await mainMenu();
}
//#endregion

const addDepartment = async () => {
    try {
        
        
        const answer = await inquirer.prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What is the name of the department?'
            }
        ]);

        await pool.query(
            'INSERT INTO departments (department_name) VALUES ($1)',
            [answer.name]
        );

        console.log('Department added successfully!');
    } catch (err) {
        console.error('Error adding department:', err);
    } 
    await mainMenu();
}
await connect();
await mainMenu();
