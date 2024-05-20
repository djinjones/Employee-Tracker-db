const express = require('express');
const PORT = process.env.PORT || 3001;
const api = require('./routes/index');
const input = require('./lib/input');
const { clog } = require('./middleware/clog');
const app = express();

// I copied the middleware clog script from a previous mini project because i like how it looks in the console
app.use(clog);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', api);


// These request functions are mostly just for testing purposes
app.get('*', (req, res) => {
    console.log('GET request to improper path');
    res.status(200).json({message: 'GET request successful, but theres nothing here!'});
});

app.post('*', (req, res) => {
    console.log('POST request to improper path' + req.body);
    res.status(200),express.json({message: 'POST request successful, but theres nothing here!'});
});

app.put('*', (req, res) => {
    console.log('PUT request to improper path' + req.body);
    res.status(200),express.json({message: 'PUT request successful, but theres nothing here!'});
});

app.delete('*', (req, res) => {
    console.log('DELETE request to improper path');
    res.status(200),express.json({message: 'DELETE request successful, but theres nothing here!'});
});



app.use((req, res) => {
    res.status(404).end();
});


// app listening on specefied port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
  