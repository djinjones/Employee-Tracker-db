DROP DATABASE IF EXISTS biznis_db;
CREATE DATABASE biznis_db;

\c biznis_db;


DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS employee_details;

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(150),
    last_name VARCHAR(150),

);

CREATE TABLE employee_details (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER,
    company_role VARCHAR(50),
    department VARCHAR(50),
    FORIEGN KEY (employee_id) REFERENCES employees(id)
)

