const express = require('express');
const PORT = process.env.PORT || 3001;
const Ask = require('./lib/input');
const app = express();
const colors = require('colors');
const DatabaseQuery = require('./lib/database')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const ask = new Ask();
const dbQuery = new DatabaseQuery;

//GET REQUESTS
app.get('/api/employees', (req, res) => {
    const sql = 'SELECT * FROM employees';
    dbQuery.getData(sql, req, res);
    ask.init();
});

app.get('/api/employees/names', (req, res) => {
    const sql = 'SELECT id, first_name, last_name FROM employees';
    dbQuery.getData(sql, req, res);
    ask.init();
});

app.get('/api/departments', (req, res) => {
    const sql = 'SELECT * FROM departments'
    dbQuery.getData(sql, req, res);
    ask.init();
});

app.get('/api/roles', (req, res) => {
    const sql = 'SELECT * FROM roles'
    dbQuery.getData(sql, req, res);
    ask.init();
});
//POST REQUESTS
// app.post('/api/employees', (req, res) => {
//     console.log(req.method, 'request received, attempting to add to database...')
//     const {first_name, last_name, department, role, salary, manager} = req.body;
//     console.log(req.body);
//     const sql ='INSERT INTO employees (first_name), (last_name), (department), (role), (salary), (manager) VALUES ($1, $2, $3, $4, $5, $6)';
//     const params = [first_name, last_name, department, role, salary, manager];
//     dbQuery.postData(sql, params, req, res);
//     res.json({message: 'create request send to database'});
    
//     ask.init();
// });

app.post('/api/employees', async (req, res) => {
    console.log(req.method, 'request received, attempting to add to database...');
    const { first_name, last_name, department, role, salary, manager } = req.body;
    console.log(req.body, 'req.body');
    const sql = 'INSERT INTO employees (first_name, last_name, department, role, salary, manager) VALUES ($1, $2, $3, $4, $5, $6)';
    const params = req.body;
//[first_name, last_name, department, role, salary, manager]
    try {
        const result = await dbQuery.postData(sql, params); // Await the database operation
        res.json({ message: 'Create request sent to database successfully' });
        ask.init(); // Initialize after sending the response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/departments', (req, res) => {
    const sql = 'INSERT INTO departments (department) VALUES ($1)';
    const params = [req.body.department];
    dbQuery.postData(sql, params, req, res);
    ask.init();
});

app.post('/api/roles', (req, res) => {
    const sql = 'INSERT INTO roles (role) VALUES ($1)';
    const params = [req.body.role];
    dbQuery.postData(sql, params, req, res);
    res.json({message: 'update request send to database'});
    ask.init();
});

app.put('/api/employees', (req, res) => {
    // const sql = 'UPDATE employees SET role =$1 WHERE employee_id = $2'
    // const params = [req.body.role, req.body.employee_id];
    dbQuery.putData(req, res);
    ask.init();
})

//Wildcard routes
// These request functions are mostly just for testing purposes
app.get('*', (req, res) => {
    console.log('GET request to improper path ❌ ', colors.red('url: '), req.url, colors.red('method: '), req.method, colors.red('params: '), req.params, colors.red('query: '), req.query, colors.red('body: '), req.body);
    res.status(200).json({message: 'GET request recived, but theres nothing here!'});
    ask.init();
});

app.post('*', (req, res) => {
    console.log('POST request to improper path ❌', colors.red('url: '), req.url, colors.red('method: '), req.method, colors.red('params: '), req.params, colors.red('query: '), req.query, colors.red('body: '), req.body);
    res.status(200),express.json({message: 'POST request recived, but theres nothing here!'});
    ask.init();
});

app.put('*', (req, res) => {
    console.log('PUT request to improper path ❌', 'url: ', colors.red('url: '), req.originalUrl, colors.red('method: '), req.method, colors.red('params: '), req.params, colors.red('query: '), req.query, colors.red('body: '), req.body);
    res.status(200),express.json({message: 'PUT request recived, but theres nothing here!'});
    ask.init();
});

app.delete('*', (req, res) => {
    console.log('DELETE request to improper path ❌', colors.red('url: '), req.originalUrl, colors.red('method: '), req.method, colors.red('params: '), req.params, colors.red('query: '), req.query, colors.red('body: '), req.body);
    res.status(200),express.json({message: 'DELETE request recived, but theres nothing here!'});
    ask.init();
});





app.use((req, res) => {
    res.status(404).end();
});


// app listening on specefied port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



ask.init();