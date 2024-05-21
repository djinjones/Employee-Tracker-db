const express = require('express');
const { Pool } = require('pg');

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

class DatabaseQuery {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }

    async getData(sql, req, res) {
      try {
          const result = await pool.query(sql);
          res.json({
              message: 'success',
              data: result.rows
          });
      } catch (err) {
          res.status(400).json({ error: err.message });
      }
  }

    async postData(sql, params, req, res) {
      try {
          const result = await pool.query(sql, params);
          res.json({
              message: 'success',
              data: result.rows // Assuming you want to send back the data from the query result
          });
      } catch (err) {
          res.status(400).json({ error: err.message });
      }
  }

    async putData(req, res) {
      try {
        const sql = this.putRequestFilter(req); // Assuming putRequestFilter is a method in the same class that generates the SQL query
        const result = await pool.query(sql, params); // Assuming `params` is defined elsewhere in your code
        res.json({
            message: 'success',
            data: result.rows // Assuming you want to send back the data from the query result
        });
      } catch (err) {
          res.status(400).json({ error: err.message });
      }
}
    
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

    async deleteData(req, res) {
      const sql = `DELETE FROM employees WHERE id = $1`;
      const params = [req.params.id];
  
      try {
          const result = await pool.query(sql, params);
  
          if (!result.rowCount) {
              res.json({
                  message: 'Employee not found'
              });
          } else {
              res.json({
                  message: 'Deleted',
                  changes: result.rowCount,
                  id: req.params.id
              });
          }
      } catch (err) {
          res.status(400).json({ error: err.message });
      }
  }

}

module.exports = DatabaseQuery;
// order of data in the database:
// id, first_name, last_name (employees)
// id, department, role, salary (employee_details)