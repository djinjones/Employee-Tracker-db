const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const Ask = require('./lib/input');
const ask = new Ask();

// const DatabaseQuery = require('./lib/database')
// const dbQuery = new DatabaseQuery;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

sequelize.sync({ force: false }).then(() => {
    console.log('Connected to the database.');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        // Start the Inquirer prompts after the server is running
        ask.init();
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});

//GET REQUESTS
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

//Wildcard routes
// These request functions are mostly just for testing purposes
// app.get('*', (req, res) => {
//     console.log('GET request to improper path ❌ ', colors.red('url: '), req.url, colors.red('method: '), req.method, colors.red('params: '), req.params, colors.red('query: '), req.query, colors.red('body: '), req.body);
//     res.status(200).json({message: 'GET request recived, but theres nothing here!'});
//     ask.init();
// });

// app.post('*', (req, res) => {
//     console.log('POST request to improper path ❌', colors.red('url: '), req.url, colors.red('method: '), req.method, colors.red('params: '), req.params, colors.red('query: '), req.query, colors.red('body: '), req.body);
//     res.status(200),express.json({message: 'POST request recived, but theres nothing here!'});
//     ask.init();
// });

// app.put('*', (req, res) => {
//     console.log('PUT request to improper path ❌', 'url: ', colors.red('url: '), req.originalUrl, colors.red('method: '), req.method, colors.red('params: '), req.params, colors.red('query: '), req.query, colors.red('body: '), req.body);
//     res.status(200),express.json({message: 'PUT request recived, but theres nothing here!'});
//     ask.init();
// });

// app.delete('*', (req, res) => {
//     console.log('DELETE request to improper path ❌', colors.red('url: '), req.originalUrl, colors.red('method: '), req.method, colors.red('params: '), req.params, colors.red('query: '), req.query, colors.red('body: '), req.body);
//     res.status(200),express.json({message: 'DELETE request recived, but theres nothing here!'});
//     ask.init();
// });

// app listening on specefied port
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });