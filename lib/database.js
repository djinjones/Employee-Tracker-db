const express = require('express');
const { Pool } = require('pg');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
    {
        user: 'postgres',
        password: 'ca11iopeMori',
        host: 'localhost',
        database: 'biznis_db',
        port: 5432,
    },
    console.log('Connected to biznis_db.')
);

pool.connect();

class databaseQuery {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }

    getData(req, res) {
        const sql = 'SELECT * FROM employees';

        pool.query(sql, (err, result) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            res.json({
              message: 'success',
              data: body
            });
            console.log(res.body);
          });
          next();
    };

    postData(req, res) {
        const sql ='INSERT INTO employees (first_name), (last_name) VALUES $1';
        const params = [body.first_name, body.last_name];

        pool.query(sql, params, (err, result) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            res.json({
              message: 'success',
              data: body
            });
          });
    };

    putData(req, res) {
        const sql = this.putRequestFilter(req);
        pool.query(sql, params, (err, result) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            res.json({
              message: 'success',
              data: body
            });
          });

    };
    
    putRequestFilter(req) {
            // we need a funciton that checks what information we need to update and converts it to sql code to send to the pool query
        let id = req.body.id;
        const parameters = [req.body.first_name, req.body.last_name, req.body.department, req.body.role, req.body.salary];
        let change = [];
        let table;

        parameters.forEach(parameter => {
            if (parameter) {
                for (const [key, value] of Object.entries(parameter)) {
                    change.push(key, value);
                }
            } else {
                console.log('It would seem theres and error, but what could it be??');
            }
        });

        if (parameter == 'department' || 'role' || 'salary') {
            table = 'employee_details';
        } else {
            table = 'employees'
        }
        const sql = `UPDATE ${value} SET ${change[0]} = ${change[1]} WHERE id = ${id}`
        return JSON.stringify(sql);
    };

    deleteData(res, req) {
        const sql = `DELETE FROM employees WHERE id = $1`
        const params = [req.params.id];

        pool.query(sql, params, (err, result) => {
            if (err) {
              res.statusMessage(400).json({ error: err.message });
            } else if (!result.rowCount) {
              res.json({
                message: 'Movie not found'
              });
            } else {
              res.json({
                message: 'deleted',
                changes: result.rowCount,
                id: req.params.id
              });
            }
          });
    }
}

module.exports = database;
// order of data in the database
// id, first_name, last_name (employees)
// id, department, role, salary (employee_details)