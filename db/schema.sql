DROP DATABASE IF EXISTS biznis_db;
CREATE DATABASE biznis_db;

-- \c biznis_db;

-- DROP TABLE IF EXISTS employees;
-- DROP TABLE IF EXISTS employee_details;
-- DROP TABLE IF EXISTS roles;
-- DROP TABLE IF EXISTS departments;

-- CREATE TABLE employees (
--     id SERIAL PRIMARY KEY,
--     first_name VARCHAR(150),
--     last_name VARCHAR(150)
-- );

-- CREATE TABLE roles (
--     id SERIAL PRIMARY KEY,
--     company_role VARCHAR(50),
--     salary INTEGER
-- );

-- CREATE TABLE departments (
--     id SERIAL PRIMARY KEY, 
--     department VARCHAR(50) 
-- );

-- CREATE TABLE employee_details (
--     id SERIAL PRIMARY KEY,
--     employee_id INTEGER,
--     company_role VARCHAR(50),
--     department VARCHAR(50),
--     salary INTEGER,
--     manager VARCHAR(50)
--    -- FOREIGN KEY (employee_id) REFERENCES employees(id),
--   --  FOREIGN KEY (salary) REFERENCES roles(id),
--    -- FOREIGN KEY (department) REFERENCES departments(department),
--    -- FOREIGN KEY (company_role) REFERENCES roles(company_role)
-- );