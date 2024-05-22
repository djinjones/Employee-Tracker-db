const router = require('express').Router();
const Department = require('../../models/department')

const Ask = require('../../lib/input')
const ask = new Ask();


router.get('/', async (req, res) => {
    try {
        const departmentsList = await Department.findAll();
        res.status(200).json({ message: 'Departments found'}, departmentsList);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
    // const sql = 'SELECT * FROM departments'
    // dbQuery.getData(sql, req, res);
    ask.init();
});

router.post('/', async (req, res) => {
    try {
        const addDepartment = await Department.create(req.body);
        res.status(200).json({ message: 'Department added'}, addDepartment);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
    // const sql = 'INSERT INTO departments (department) VALUES ($1)';
    // const params = [req.body.department];
    // dbQuery.postData(sql, params, req, res);
    ask.init();
});


module.exports = router;