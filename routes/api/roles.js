const router = require('express').Router();
const Role = require('../../models/role');

const Ask = require('../../lib/input')
const ask = new Ask();


router.get('/', async (req, res) => {
    try {
        const rolesList = await Role.findAll();
        if (!rolesList) {
            res.status(404).json({message: 'no roles found'});
        }
        res.status(200).json({message: `roles found. res.body = ${res.body}, res.params = ${res.params}, ${rolesList}`})
    } catch (err) {
        res.status(500).json(err)
    }
    ask.init();
    // const sql = 'SELECT * FROM roles'
    // dbQuery.getData(sql, req, res);
    
});


router.post('/', async (req, res) => {
    try {
        const addRole = await Role.create(req.body);
        res.status(200).json(addRole)
    } catch (err) {
        res.status(500).json(err);
    }
    ask.init();
    // const sql = 'INSERT INTO roles (role) VALUES ($1)';
    // const params = [req.body.role];
    // dbQuery.postData(sql, params, req, res);
    // res.json({message: 'update request send to database'});
    
});


module.exports = router;