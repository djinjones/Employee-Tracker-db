const router = require('express').Router();
const Employee = require('../../models/employee')

const Ask = require('../../lib/input')
const ask = new Ask();


router.get('/', async (req, res) => {
    try {
        const employeeList = await Employee.findAll();
        if (!employeeList) {
            res.status(404).json({message: 'no roles found'});
        }
        res.status(200).json({message: `roles found. res.body = ${res.body}, res.params = ${res.params}, ${employeeList}`})
    } catch (err) {
        res.status(500).json(err)
    }

    // const sql = 'SELECT * FROM employees';
    // dbQuery.getData(sql, req, res);
    ask.init();
});

router.get('/names', async (req, res) => {
    try {
        const employeeNames = await Employee.findAll({attributes: ['id', 'first_name', 'last_name']})
        if (!employeeNames) {
            res.status(404).json({message: 'no employees found'});
        }
        res.status(200).json({message: `employees found. res.body = ${res.body}, res.params = ${res.params}, ${employreNames}`})
    } catch (err) {
        res.status(500).json(err)
    }

    // const sql = 'SELECT id, first_name, last_name FROM employees';
    // dbQuery.getData(sql, req, res);
    ask.init();
});

router.put('/:id', async (req, res) => {
    try {
        const employee_id = req.params.id;
        const updatedRole = req.body
        const [updated] = await Employee.update(updatedRole, { where: { id: employee_id }});

        if (updated) {
            const updatedEmployee = await Employee.findOne({ where: { id: employee_id }});
            res.json({ message: 'Employee role updated successfully', employee: updatedEmployee })
        } else {
            res.status(404).json({ message: 'Employee not found!' })
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update employee' });
    }

    // const sql = 'UPDATE employees SET role =$1 WHERE employee_id = $2'
    // const params = [req.body.role, req.body.employee_id];

    ask.init();
})

router.post('/', async (req, res) => {
    try {
        const addNewEmployee = await Employee.create(req.body);
        res.status(200).json({ message: 'New employee added'}, addNewEmployee)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add new employee'})
    }


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
