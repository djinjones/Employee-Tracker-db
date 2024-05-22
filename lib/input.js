const inquirer = require('inquirer');
const Employee = require('../models/employee');
const Role = require('../models/role');
const Department = require('../models/department');
const Seed = require('../db/seed');
const Table = require('cli-table3');

const seed = new Seed;

class Ask {
    async createToDatabase(tableName, answers) {
        try {
        const userData = await tableName.create(answers);
        console.log(userData);
        } catch (err) {
            console.error(err);
        }
        return this.init();
    };

    async fetchData(tableName) {
        try {
            const data = await tableName.findAll({ raw: true });

            console.log(data);
            if (data.length === 0) {
                console.log('No data found');
                return this.init();
            }
    
            const table = new Table({
                head: Object.keys(data[0]),
                colWidths: new Array(Object.keys(data[0]).length).fill(20)
            });
    
            data.forEach(row => {
                table.push(Object.values(row));
            });
    
            console.log(table.toString());
        } catch (err) {
            console.error(err);
        }
    
        return this.init();
    }

    // async fetchData(tableName) {
    //     try {
    //         const data = await tableName.findAll();
    //         console.log(data);
    //     } catch (err) {
    //         console.error(err);
    //     }

    //     return this.init();
    // }

    async addEmployee() {
        try {

            const roles = await Role.findAll({ attributes: ['id', 'title'] });
            const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id
}));
            //console.log(choices + 'input.js: 64');
            const employeeList = [
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
                    type: 'list',
                    name: 'roleId',
                    message: 'Add role from list of roles',
                    choices: roleChoices,
                },
                {
                    type: 'input',
                    name: 'manager',
                    message: 'Enter manager',
                    default: 'Saegusa Kouichi'
                }
            ];
    
            inquirer.prompt(employeeList).then(async (answers) => {
                await this.createToDatabase(Employee, answers);
                console.log('Employee added successfully');

            });
        } catch (err) {
            console.error(err);
        }

        return;
    }

    
    async addDepartment() {
        try {
            const departmentList = [
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter new department name',
                    default: 'Food'
                }
            ];

            inquirer.prompt(departmentList).then(async (answers) => {
                await this.createToDatabase(Department, answers);
                console.log('Department added successfully');

            })

        
            // const data = await inquirer.prompt(departmentList);
            // this.createToDatabase(Department, data);
            // console.log(data);

        } catch (err) {
            console.error(err);
        }

        return;
    };

    async addRole() {
        try {
        const departments = await Department.findAll();
        const departmentChoices = departments.map(dep => ({
            name: dep.name,
            value: dep.id
        }));

        const roleList = [
            {
                type: 'input',
                name: 'title',
                message: 'Enter new role name',
                default: 'Sushi slicer',
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Choose a department to put this role under',
                choices: departmentChoices,
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary for this role',
                default: 10000
            }
        ];

        // inquirer.prompt(roleList).then(async (answers) => {
        //     await this.createToDatabase(Role, answers);
        //     console.log('Role added succesfully');

        // })

        const data = await inquirer.prompt(roleList);
        this.createToDatabase(Role, data);
        console.log('Role added successfully');

        } catch (err) {
            console.error(err);
        }

        return;
    };

    async updateRole() {
        try {
            const allEmployees = await Employee.findAll();
            const allRoles = await Role.findAll();
    
            // Format choices for inquirer list prompts
            const employeeChoices = allEmployees.map(emp => ({
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id
            }));
            const roleChoices = allRoles.map(role => ({
                name: role.title,
                value: role.id
            }));
    
            const chooseEmployee = [
                {
                    type: 'list',
                    name: 'employee_to_update',
                    message: 'Choose an employee from the list to update their role',
                    choices: employeeChoices,
                }
            ];
            const chooseRole = [
                {
                    type: 'list',
                    name: 'new_role',
                    message: 'Choose a role from the list to replace the current role',
                    choices: roleChoices,
                }
            ];
    

            const employeeToUpdate = await inquirer.prompt(chooseEmployee);

            const changedRole = await inquirer.prompt(chooseRole);
    

            console.log(`Employee ID: ${employeeToUpdate.employee_to_update} will change role to Role ID: ${changedRole.new_role}`);
    
            const employee = await Employee.findByPk(employeeToUpdate.employee_to_update);
            if (employee) {
                employee.role_Id = changedRole.new_role;
                await employee.save();
                console.log(`Employee ${employee.first_name} ${employee.last_name}'s role has been updated successfully.`);
            }
            this.init();
        } catch (err) {
            console.error(err);
        }
    
        return;
    }



async init() {
    try {
        const initList = [
            {
                type: 'list',
                name: 'init',
                message: 'choose one of the following to begin:',
                choices: ['View all employees', 'View all departments', 'View all roles', 'Add an employee', 'Add a department', 'Add a role', 'Update employee role', 'Auto-seed database', 'Quit'],
                default: 'View all employees'
            }
        ];

        const answers = await inquirer.prompt(initList);
        const selectedOption = answers.init; // Get the selected option

        switch (selectedOption) {
            case 'View all employees':
                await this.fetchData(Employee);
                break;
            case 'View all departments':
                await this.fetchData(Department);
                break;
            case 'View all roles':
                await this.fetchData(Role);
                break;
            case 'Add an employee':
                await this.addEmployee();
                break;
            case 'Add a department':
                await this.addDepartment();
                break;
            case 'Add a role':
                await this.addRole();
                break;
            case 'Update employee role':
                await this.updateRole();
                break;
            case 'Auto-seed database':
                await this.autoSeed();
                break;
            case 'Quit':
                this.quit();
                break;
            default:
                console.log('Invalid option');
        }
    } catch (err) {
        console.error(err);
    } 

};

    async autoSeed() {
        seed.spawnDepartments()
        .then(seed.spawnRoles())
        .then(seed.spawnEmployees())
        .then(this.init())
        .catch((err) => {console.error(err)})
        
    };

    quit() {
        return;
    };


    
};

module.exports = Ask;


    // async updateRole() {
    //     try {
    //         const allEmployees = await Employee.findAll();
    //         const allRoles = await Role.findAll();

    //         const chooseEmployee = [
    //             {
    //                 type: 'list',
    //                 name: 'employee_to_update',
    //                 message: 'Choose and employee from the list to update their role',
    //                 choices: allEmployees,
    //             }
    //         ];
    //         const chooseRole = [
    //             {
    //                 type: 'list',
    //                 name: 'new_role',
    //                 message: 'Choose a role from the list to replace current role',
    //                 choices: allRoles,
    //             }
    //         ];

    //         const employeeToUpdate = await inquirer.prompt(chooseEmployee);
    //         const changedRole = await inquirer.prompt(chooseRole);

    //         //const newEmployeeId = await 

    //         console.log(`${employeeToUpdate} will change roles to ${changedRole}`);
            
    //         //const 

    //     } catch (err) {
    //         console.error(err);
    //     }

    //     return;
    // };

//I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role


            // async function postData(answers) {
            //     try {
            //         const response = await fetch('http://localhost:3001/api/employees', {
            //             method: 'POST',
            //             headers: {
            //                 'Content-type': 'application/json'
            //             },
            //             body: JSON.stringify(answers)
            //         });
                    
            //         if (!response.ok) {
            //             throw new Error('Response was not OK');
            //         }
            
            //         const data = await response.json();
            //         console.log(data);
            //         return data;
            //     } catch (err) {
            //         console.error(err);
            //         throw err; 
            //     }
            // }


// needs to ask all questions about employees and add them to the data base

// we need to make a store data function  so that when going through the different loops the information is not lost 

// needs to make it so it can search through the database to update a current employee

// when adding a new employee there needs to be the option to add it to an existing one without typing it in

// there also needs to be a a choice to create new department if this list of current ones is empty or the department hasn't been added yet
    
    

    // async addEmployee() {
    //     try {
    //     const choices = await Role.findAll({ attributes: 'title' })

        // const employeeList = [
        //     {
        //         type: 'input',
        //         name: 'first_name',
        //         message: 'Enter employee first name',
        //         default: 'Mayumi'
        //     },
        //     {
        //         type: 'input',
        //         name: 'last_name',
        //         message: 'Enter employee last name',
        //         default: 'Saegusa'
        //     },
        //     {
        //         type: 'list',
        //         name: 'role',
        //         message: 'Add role from list of roles',
        //         choices: choices,
        //     },
        //     {
        //         type: 'input',
        //         name: 'manager',
        //         message: 'Enter manager',
        //         default: 'Saegusa Kouichi'
        //     }
        // ];


    //     const answers = await inquirer.prompt(employeeList);

    //     async function postData(answers) {
    //         try {
    //             const response = await fetch('http://localhost:3001/api/employees', {
    //                         method: 'POST',
    //                         headers: {
    //                             'Content-type': 'application/json'
    //                         },
    //                         body: JSON.stringify(answers)
    //                     });
    //             if (!response.ok) {
    //                 throw new Error('Response was not OK');
    //             }

    //             const data = await response.json();
    //             console.log(data);
    //             return data;
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
       
    //     await postData(answers);


    //     //await this.createToDatabase(Employee, data);
    //     console.log(data);

    //     } catch (err) {
    //         console.error(err);
    //     }

    //     this.init();
    // };


    // async fetchDataGet(query) {
    //     const baseUrl = 'http://localhost:3001/api/';
    //     try {
    //         const response = await fetch(`${baseUrl}${query}`);
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok ❌ input.js: 124');
    //         }
    //         const data = await response.json();
    //         console.log('Data received:', data);
    //         return data;
    //     } catch (error) {
    //         console.error('Fetch error:', error);
    //         return [];
    //     } 
    // }

    // async fetchDataPost(query, answers) {
    //     const baseUrl =`http://localhost:3001/api/${query}`;
    //     console.log('attempting to send POST request js:115 answers: ', answers)
    //     try {
    //         const response = await fetch(baseUrl, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(answers),
    //         });
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok ❌ input.js: 125');
    //         }
    //         const responseData = await response.json();
    //         console.log('Data received:', responseData);
    //         return responseData;
    //     } catch (error) {
    //         console.error('Fetch error:', error);
    //         return [];
    //     }
    // }

    // async fetchDataPut(query, answers) {
    //     const baseUrl = `http://localhost:3001/api/${query}`
    //     try {
    //         const response = await fetch(baseUrl, {
    //             method: 'PUT',
    //             headers: {
    //                     'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify(answers)
    //         });
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok ❌ input.js: 147');
    //         }
    //         const responseData = await response.json();
    //         console.log('Data recieved:', responseData);
    //         return responseData;
    //     } catch (error) {
    //         console.error('Fetch error:', error);
    //         return [];
    //     }
    // }

    // async updateEmployee() {
    //     const query = 'employees/names';
    //     const employees = await this.fetchDataGet(query);
    //     const choices = employees.map(employee => ({
    //         name: `${employee.first_name} ${employee.last_name}`,
    //         value: employee.id
    //     }));

    //     const updateEmployeeList = [
    //         {
    //             type: 'list',
    //             name: 'updateEmployee',
    //             message: 'Which employee would you like to update?',
    //             choices: choices
    //         }
    //     ];

    //     const { updateEmployee } = await inquirer.prompt(updateEmployeeList);
        
    //     console.log('Selected employee ID:', updateEmployee);
    // }

    // async addDepartment() {
    // // ask what department to add
    // // use fetchDataPost() to send a post request to databse
    // // create body of post request by sending the json(answers);
    //     try {
    //     const updateDepartmentList = [
    //         {
    //             type: 'input',
    //             name: 'updateDepartment',
    //             message: 'enter a department name to add',
    //             default: 'food'
    //         }
    //     ]

    //     const { updateDepartment } = await inquirer.prompt(updateDepartmentList);
    //     const query = 'department'
    //     const department = await this.fetchDataPost(updateDepartment, query);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // async addRole() {
    //     try {
    //     const addRoleList = [
    //         {
    //             type: 'input',
    //             name: 'addRole',
    //             message: 'enter a Role to add',
    //             default: 'food'
    //         }
    //     ]

    //     const { addRole } = await inquirer.prompt(addRoleList);
    //     const query = 'role'
    //     const department = await this.fetchDataPost(addRole, query);
    //     console.log(department);
    //     } catch (err) {
    //         console.error(err);
    //     }

    // }

    // async updateRole() {
    //     try {
    //         const updateRoleList = [
    //             {
    //                 type: 'input',
    //                 name: 'updateRoleId',
    //                 message: 'Enter employee id to change role',
    //                 default: '1'
    //             },
    //             {
    //                 type: 'input',
    //                 name: 'updatedRole',
    //                 message: 'if employee id is correct, what would you like to call the new role?',
    //                 default: 'bababooey'
    //             }
    //         ]
    //         const responses = await inquirer.prompt(updateRoleList);
    //         const query = `employees/:${responses[0]}`
    //         const updateConfrim = await this.fetchDataPut(responses[1], query);
    //         console.log(updateConfrim);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // // addNewEmployee() {
    // //     console.log('Attempting to add new employee at input.js:236');
    // //     inquirer.prompt(this.employeeList)
    // //         .then(answers => {
    // //             console.log(answers, 'at input.js: 240'); // Log after receiving user input
    // //             const query = 'employees';
    // //             return this.fetchDataPost(query, answers); // Returning a promise
    // //         })
    // //         .catch(error => {
    // //             console.error('Error adding employee:', error);
    // //         });
    // // }

    // async addNewEmployee() {
    //     try {
    //         const answers = await inquirer.prompt(this.employeeList); 
    //         console.log(answers, 'at input.js: 240');
    //         const query = 'employees';
    //         this.fetchDataPost(query, answers); 
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

  
