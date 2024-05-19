const express = require('express');
const inquirer = requrie('inquirer');
const colors = require('colors');

class Ask {
    constructor(question, answer){
        this.question = question;
        this.answer = answer;
    }

    confirmNewEmployee = [
        {
            type: 'confirm',
            name: 'addEmployee',
            message: 'Would you like to add an employee',
            default: false
        }
    ];

    confirmUpdateEmployee = [
        {
            //add update employee question
        }
    ];

    employeeName = [
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter employee first name',
            default: 'Mayui'
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
        }
    ]

    init() {

    }

    updateEmployee() {
        // add update employee inquirer prompt using confirmUpdateEmployee question
        inquirer.prompt()
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