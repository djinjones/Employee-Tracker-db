
//const { Employee, Role, Department } = require('./models');
const Employee = require('../models/employee');
const Role = require('../models/role');
const Department = require('../models/department');
const sequelize = require('../config/connection');

class Seed {

    employeeData = [
        {first_name: 'jon', last_name: 'smith', roleId: 1, manager: 'Gamma'},
        {first_name: 'light', last_name: 'yagami', roleId: 2, manager: 'Ryuk'},
        {first_name: 'lucy', last_name: 'heartfelia', roleId: 3, manager: 'Natsu'},
        {first_name: 'rimiru', last_name: 'tempest', roleId: 4, manager: 'Shion'},
        {first_name: 'miya', last_name: 'yotsuba', roleId: 5, manager: 'No one'},
        {first_name: 'naruto', last_name: 'uzumaki', roleId: 6, manager: 'Kakashi'},
        {first_name: 'monkey', last_name: 'd. luffy', roleId: 7, manager: 'Himself'},
        {first_name: 'hingle', last_name: 'mcCringleberry', roleId: 8, manager: 'Javaris Jamar Javarison-Lamar'},
    ];
    
    roleData = [
        {title: 'train security', salary: 15000, departmentId: 1},
        {title: 'chip eater', salary: 6700, departmentId: 2},
        {title: 'key collector', salary: 33331, departmentId: 3},
        {title: 'other world investigator', salary: 1500000, departmentId: 3},
        {title: 'military advisor', salary: 56000000, departmentId: 4},
        {title: 'ramen eater', salary: 20, departmentId: 2},
        {title: 'pirate captian', salary: 4000000, departmentId: 3},
        {title: 'basketball guy', salary: 3, departmentId: 4},
    ];
    
    departmentData = [
        {name: 'transportation'},
        {name: 'food'},
        {name: 'exploration'},
        {name: 'management'},
    
    ];
    
    async spawnDepartments() {
        try {
            for (const department of this.departmentData) {
                await Department.findOrCreate({
                    where: { name: department.name },
                    defaults: department
                });
            }
            console.log('Departments created successfully');
        } catch (error) {
            console.error('Error creating departments:', error);
        }
    };

    async spawnRoles() {
        try {
            for (const role of this.roleData) {
                await Role.findOrCreate({
                    where: { title: role.title },
                    defaults: role
                });
            }
            console.log('Roles created successfully');
        } catch (error) {
            console.error('Error creating roles:', error);
        }
    };

    async spawnEmployees() {
        try {
            await Employee.bulkCreate(this.employeeData, { ignoreDuplicates: true });
            console.log('Employees created successfully');
        } catch (error) {
            console.error('Error creating employees:', error);
        }
    };
};





module.exports = Seed;

