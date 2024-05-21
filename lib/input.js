const express = require('express');
const inquirer = require('inquirer');
const colors = require('colors');
const DatabaseQuery = require('./database');
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


const dbQuery = new DatabaseQuery();

class Ask {
    constructor(someVar){
        this.someVar = someVar;
    }

    employeeList = [
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter employee first name',
            default: 'Mayumi'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter employee last name',
            default: 'Saegusa'
        },
        {
            type: 'input',
            name: 'department',
            message: 'Enter department',
            default: 'Education'
        },
        {
            type: 'input',
            name: 'role',
            message: 'Enter role',
            default: 'Student'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter salary',
            default: '10000'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Enter manager',
            default: 'Saegusa Kouichi'
        }
    ];



//I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

    initList = [
        {
            type: 'list',
            name: 'init',
            message: 'choose one of the following to begin:',
            choices: ['view all employees', 'view all departments', 'view all roles', 'add an employee', 'add a department', 'add a role', 'update employee role'],
            default: 'view all employees'
        }
    ];

    async init() {
        try {
            const answers = await inquirer.prompt(this.initList);
            let query;
    
            switch (answers.init) {
                case 'view all employees':
                    query = 'employees';
                    await this.fetchDataGet(query);
                    break;
                case 'view all departments':
                    query = 'departments';
                    await this.fetchDataGet(query);
                    break;
                case 'view all roles':
                    query = 'roles';
                    await this.fetchDataGet(query);
                    break;
                case 'add an employee':
                    console.log('choice: add an employee');
                    await this.addNewEmployee();
                    break;
                case 'add a department':
                    await this.addDepartment();
                    break;
                case 'add a role':
                    await this.addRole();
                    break;
                case 'update employee role':
                    await this.updateEmployee();
                    break;
                default:
                    console.log('Invalid choice');
            }
        } catch (err) {
            console.log(err);
        }
    }

    async fetchDataGet(query) {
        const baseUrl = 'http://localhost:3001/api/';
        try {
            const response = await fetch(`${baseUrl}${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Data received:', data);
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        } 
    }

    async fetchDataPost(query, answers) {
        const baseUrl =`http://localhost:3001/api/${query}`;
        console.log('attempting to send POST request js:138 answers: ', answers)
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(answers)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            console.log('Data received:', responseData);
            return responseData;
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        }
    }

    async fetchDataPut(query, answers) {
        const baseUrl = `http://localhost:3001/api/${query}`
        try {
            const response = await fetch(baseUrl, {
                method: 'PUT',
                headers: {
                        'Content-type': 'application/json'
                },
                body: JSON.stringify(answers)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            console.log('Data recieved:', responseData);
            return responseData;
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        }
    }

    async updateEmployee() {
        const query = 'employees/names';
        const employees = await this.fetchDataGet(query);
        const choices = employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }));

        const updateEmployeeList = [
            {
                type: 'list',
                name: 'updateEmployee',
                message: 'Which employee would you like to update?',
                choices: choices
            }
        ];

        const { updateEmployee } = await inquirer.prompt(updateEmployeeList);
        // Now you have the selected employee's ID in `updateEmployee`
        console.log('Selected employee ID:', updateEmployee);
    }

    async addDepartment() {
    // ask what department to add
    // use fetchDataPost() to send a post request to databse
    // create body of post request by sending the json(answers);
        const updateDepartmentList = [
            {
                type: 'input',
                name: 'updateDepartment',
                message: 'enter a department name to add',
                default: 'food'
            }
        ]

        const { updateDepartment } = await inquirer.prompt(updateDepartmentList);
        const query = 'department'
        const department = await this.fetchDataPost(updateDepartment, query);
    }

    async addRole() {
        const updateRoleList = [
            {
                type: 'input',
                name: 'updateRole',
                message: 'enter a Role to add',
                default: 'food'
            }
        ]

        const { updateDepartment } = await inquirer.prompt(updateDepartmentList);
        const query = 'department'
        const department = await this.fetchDataPost(updateDepartment, query);
    }

    // addNewEmployee() {
    //     console.log('Attempting to add new employee at input.js:236');
    //     inquirer.prompt(this.employeeList)
    //         .then(answers => {
    //             console.log(answers, 'at input.js: 240'); // Log after receiving user input
    //             const query = 'employees';
    //             return this.fetchDataPost(query, answers); // Returning a promise
    //         })
    //         .catch(error => {
    //             console.error('Error adding employee:', error);
    //         });
    // }

    async addNewEmployee() {
        console.log('Attempting to add new employee at input.js:236');
        const answers = await inquirer.prompt(this.employeeList); // Wait for user input
        console.log(answers, 'at input.js: 240'); // Log the answers received from inquirer
        const query = 'employees';
        this.fetchDataPost(query, answers); // Wait for the POST request to complete
    }

  
};

module.exports = Ask;

// needs to ask all questions about employees and add them to the data base

// we need to make a store data function  so that when going through the different loops the information is not lost 

// needs to make it so it can search through the database to update a current employee

// when adding a new employee there needs to be the option to add it to an existing one without typing it in

// there also needs to be a a choice to create new department if this list of current ones is empty or the department hasn't been added yet