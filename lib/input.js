const express = require('express');
const inquirer = requrie('inquirer');
const colors = require('colors');
const db = require('./database');

//I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

class Ask {
    constructor(question, answer){
        this.question = question;
        this.answer = answer;
    }

    employeeNames = [];
    departmentNames = [];


    confirmNewEmployee = [
        {
            type: 'confirm',
            name: 'addEmployee',
            message: 'Would you like to add an employee?',
            default: false
        }
    ];

    confirmUpdateEmployee = [
        {
           type: 'confirm',
           name: 'confirmUpdateEmployee',
           message: 'Would you like to update an employee?',
           default: false
        }
    ];

    employeeName = [
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
        }
    ];

    updateEmployee = [
        {
            // add update employee question with choices from the list of employees from the data base
            type: 'choice',
            name: 'updateEmployee',
            message: 'Which employee would you like to update?',
            choices: []
        }
    ]

    init() {

    }

    updateEmployee() {
        // add update employee inquirer prompt using confirmUpdateEmployee question
        inquirer.prompt(this.updateEmployee)
    }

    saveAnswer() {
    console.log(question.red.underline, answer.green.underline);

  };
    addEmployeeDetails() {
        inquirer.prompt(employeeName).then((response) => {
            if (!response) {
                console.log('You must enter a name!');
                return
            } else {}
        })
    }

    addNewEmployee() {
        inquirer.prompt(confirmNewEmployee).then((response) => {
            if (response === true) {
                this.addEmployeeDetails();
            } else {this.confirmUpdateEmployee()};
        })
    };



  
};

module.exports = Ask;

// needs to ask all questions about employees and add them to the data base

// we need to make a store data function  so that when going through the different loops the information is not lost 

// needs to make it so it can search through the database to update a current employee

// when adding a new employee there needs to be the option to add it to an existing one without typing it in

// there also needs to be a a choice to create new department if this list of current ones is empty or the department hasn't been added yet