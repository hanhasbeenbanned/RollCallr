DROP DATABASE IF EXISTS rollcallr_db;
CREATE DATABASE rollcallr_db;

\c rollcallr_db;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) UNIQUE NOT NULL
    salary DECIMAL NOT NULL
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) 
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id) ,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);
