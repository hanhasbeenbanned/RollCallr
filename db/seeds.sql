INSERT INTO
    departments (department_name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO
    roles (title, salary, department_id)
VALUES
    ('Software Engineer', 100000, 1),
    ('Accountant', 80000, 2),
    ('Attorney', 120000, 3),
    ('Salesperson', 80000, 4);

INSERT INTO
    employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Alice', 'Smith', 1, NULL),
    ('Bob', 'Jones', 2, 1),
    ('Charlie', 'Brown', 3, 2),
    ('David', 'White', 4, 3);