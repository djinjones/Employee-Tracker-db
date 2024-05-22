const router = require('express').Router();
const employee = require('../../models/employee')

const Ask = require('../../lib/input')
const ask = new Ask();


router.get('/', (req, res) => {
    // const sql = 'SELECT * FROM employees';
    // dbQuery.getData(sql, req, res);
    ask.init();
});

router.get('/names', (req, res) => {
    // const sql = 'SELECT id, first_name, last_name FROM employees';
    // dbQuery.getData(sql, req, res);
    ask.init();
});

router.put('/', (req, res) => {
    // const sql = 'UPDATE employees SET role =$1 WHERE employee_id = $2'
    // const params = [req.body.role, req.body.employee_id];

    ask.init();
})

router.post('/', async (req, res) => {
//     console.log(req.method, 'request received, attempting to add to database...');
//     const { first_name, last_name, department, role, salary, manager } = req.body;
//     console.log(req.body, 'req.body');
//     const sql = 'INSERT INTO employees (first_name, last_name, department, role, salary, manager) VALUES ($1, $2, $3, $4, $5, $6)';
//     const params = req.body;
// //[first_name, last_name, department, role, salary, manager]
//     try {
//         const result = await dbQuery.postData(sql, params); // Await the database operation
//         res.status(200).res.json({ message: 'Create request sent to database successfully' });
//         ask.init(); // Initialize after sending the response
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//         console.error(error);
//         console.log('employees.js: 40')
//     }
});

module.exports = router;
