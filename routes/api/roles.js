const router = require('express').Router();
const Role = require('../../models/role');

const Ask = require('../../lib/input')
const ask = new Ask();


router.get('/', async (req, res) => {
    try {
        const newRoles = await Role.findAll();
        if (!newRoles) {
            res.status(404).json({message: 'no roles found'});
        }
        res.status(200).json({message: `roles found. res.body = ${res.body}, res.params = ${res.params}, ${newRoles}`})
    } catch (err) {
        res.status(500).json(err)
    }

    // const sql = 'SELECT * FROM roles'
    // dbQuery.getData(sql, req, res);
    ask.init();
});


router.post('/', async (req, res) => {
    try {
        const addRole = await Role.create()
        
    }

    // const sql = 'INSERT INTO roles (role) VALUES ($1)';
    // const params = [req.body.role];
    // dbQuery.postData(sql, params, req, res);
    // res.json({message: 'update request send to database'});
    ask.init();
});


module.exports = router;