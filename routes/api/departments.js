const router = require('express').Router();
const Department = require('../../models/department')

const Ask = require('../../lib/input')
const ask = new Ask();


router.get('/', (req, res) => {
    // const sql = 'SELECT * FROM departments'
    // dbQuery.getData(sql, req, res);
    ask.init();
});

router.post('/', (req, res) => {
    // const sql = 'INSERT INTO departments (department) VALUES ($1)';
    // const params = [req.body.department];
    // dbQuery.postData(sql, params, req, res);
    ask.init();
});


module.exports = router;