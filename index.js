//dependencies 
const mysql = require('mysql'); 
const inquirer = require('inquirer'); 
const cTable = require('console.table'); 
//import query functions
const db = require('../DevStaffRedo/db'); 
// const { inherits } = require('node:util');
// const { exit } = require('node:process');
// const { addDepartment, deleteDepartment, addEmployee, deleteEmployee, addRole, deleteRole, updateEmployee, findAllRoles, findAllDepartments } = require('./db');

//initialize
init(); 
function init() {
    startMenu(); 
}
//start menu 
async function startMenu() {
    const {action} = await inquirer.prompt(
        [
            {
                name: 'action', 
                type: 'list', 
                message: 'Choose from the following:',
                choices: [
                    {
                        name: 'View all Departments', 
                        value: 'VIEW_ALL_DEPARTMENTS', 
                    }, 
                    {
                        name: 'Add new Department',
                        value: 'ADD_NEW_DEPARTMENT'
                    },
                    { 
                        name: 'Update existing Department',
                        value: 'UPDATE_EXISTING_DEPARTMENT'
                    },
                    {
                        name: 'Delete a Department', 
                        value: 'DELETE_A_DEPARTMENT'
                    },
                    {
                        name:'View all Employee Records',
                        value: 'VIEW_ALL_EMPLOYEE_RECORDS'
                    },
                    { 
                        name:'Add an Employee Record',
                        value: 'ADD_AN_EMPLOYEE_RECORD'
                    },
                    { 
                        name:'Update Employee Information',
                        value: 'UPDATE_EMPLOYEE_INFORMATION'
                    },
                    {
                        name:'Delete an Employee Record',
                        value: 'DELETE_AN_EMPLOYEE_RECORD'
                    }, 
                    {
                        name:'View Employee Roles',
                        value: 'VIEW_EMPLOYEE_ROLES'
                    },
                    { 
                        name:'Add Employee Role', 
                        value: 'ADD_EMPLOYEE_ROLE'
                    },
                    {
                        name:'Update Employee Role',
                        value: 'UPDATE_EMPLOYEE_ROLE'
                    },
                    {
                        name:'Delete Employee Role',
                        value: 'DELETE_EMPLOYEE_ROLE'
                    },
                    {
                        name:'View Employees by Manager', 
                        value:'VIEW_EMPLOYEES_BY_MANAGAER'
                    },
                    {
                        name:'Update Employees Manager',
                        value: 'UPDATE_EMPLOYEES_MANAGER' 
                    },
                    {
                        name:'View Total Department Budget',
                        value: 'VIEW_TOTAL_BUDGET'
                    },
                    {
                        name:'exit',
                        value: 'EXIT'
                    }
                

                ]
            }
        ]);
        switch(action) {
            //departments
            case 'VIEW_ALL_DEPARTMENTS':
                return viewDepartment();
            case 'ADD_NEW_DEPARTMENT':
                return addDepartment(); 
            case 'UPDATE_EXISTING_DEPARTMENT':
                return updateDepartment(); 
            case 'DELETE_A_DEPARTMENT':
                return deleteDepartment(); 
            //employees
            case 'VIEW_ALL_EMPLOYEE_RECORDS':
                return viewEmployees();
            case 'UPDATE_EMPLOYEE_INFORMATION':
                return updateEmployee();  
            case 'ADD_AN_EMPLOYEE_RECORD': 
                return addEmployee(); 
            case 'DELETE_AN_EMPLOYEE_RECORD': 
                return deleteEmployee(); 
            //roles
            case 'VIEW_EMPLOYEE_ROLES':
                return viewRoles(); 
            case 'ADD_EMPLOYEE_ROLE':
                return addRole(); 
            case 'UPDATE_EMPLOYEE_ROLE': 
                return updateRole(); 
            case 'DELETE_EMPLOYEE_ROLE':
                return deleteRole(); 
            //bonus
            case 'VIEW_EMPLOYEES_BY_MANAGER': 
                return viewByManager(); 
            case 'UPDATE_EMPLOYEES_MANAGER':
                return updateManager(); 
            case 'VIEW_TOTAL_BUDGET': 
                return utilBudget(); 
            default: 
                return exitProgram(); 
        } 
}
//department
async function viewDepartment() {
    const departments = await db.findAllDepartments(); 
    console.log(`\n`); 
    console.table(departments); 

    startMenu(); 
}
async function addDepartment() {
    const department = await inquirer.prompt(
        [{
            name: 'name', 
            message: 'Enter the department name'
        }]
    ); 
    await db.addDepartment(department); 
    console.log(`Added ${department.name} to the database`); 

    startMenu(); 
}
// async function updateDepartment() {
//     const departments = await findAllDepartments(); 
//     const departmentChoices = departments.map( ({id, name}) => ({
//         name: `${department.name}`, 
//         value: id 
//     })); 
//     const {departmentId} = await inquirer.prompt([
//         {
//             type:'list', 
//             name: 'departmentId', 
//             message: 'select which department to update', 
//             choices: departmentChoices
//         }
//     ]); 
//     await db.updateDepartment(departmentId); 
//     console.log(`department updated in database`); 

//     startMenu(); 
// }
// async function deleteDepartment(departmentId) {
//     const departments = await db.findAllDepartments(); 
//     const departmentChoices = departments.map( ({id, name}) => ({
//         name: name, 
//         value: id
//     })); 
//     const {departmentId} = await inquirer.prompt([
//         {
//             type: 'list', 
//             name: 'departmentId', 
//             message: 'please enter the department to remove (WARNING: this will also remove associated roles and employees)', 
//             choices: departmentChoices
//         }
//     ]); 
//     await db.deleteDepartment(departmentId);
//     console.log(`Removed department from database`); 
    
//     startMenu(); 
// }
//employee
async function viewEmployees() {
    const employees = await db.findAllEmployees(); 
    console.log(`\n`); 
    console.table(employees); 

    startMenu(); 
}
async function addEmployee() {
    const roles = await db.findAllRoles(); 
    const employees = await db.findAllEmployees(); 
    const employee = await inquirer.prompt([
        {
            name: 'first_name', 
            message: 'what is the first name?'
        }, 
        {
            name: 'last_name', 
            message: 'what is the last name?'
        }
    ]); 
    const roleChoices = roles.map( ({id, title}) => ({
        name: title, 
        value: id
    })); 
    const {roleId} = await inquirer.prompt([
        {
            type: 'list', 
            name: 'roleId', 
            message: 'what role for this employee?',
            choices: roleChoices
        }
    ]); 
    employee.role_id = roleId; 

    const managerChoices = employees.map( ({id, first_name, last_name}) => ({
        name: `${first_name} ${last.name}`, 
        value: id
    })); 
    managerChoices.unshift( {name: 'None', value: null}); 
    const {managerId} = await inquirer.prompt([
        {
            type: 'list', 
            name: 'managerId', 
            message: 'enter employee manager if applicable', 
            choices: managerChoices
        }
    ]); 
    employee.manager_id = managerId; 
    await db.addEmployee(employee); 
    console.log(`Added ${employee.first_name} ${employee.last_name} to the database`); 

    startMenu(); 
}
async function updateEmployee() {
    const employee = await db.findAllEmployees(); 
    const employeeChoices = employees.map( ({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`, 
        value: id
    })); 
    const {employeeId} = await inquirer.prompt([
        {
            type: 'list', 
            name: 'employeeId', 
            message: 'select the employee to update',
            choices: employeeChoices
        }
    ]); 
    await db.updateEmployee(employeeId); 
    console.log(`employee updated in database`); 

    startMenu(); 
}
async function deleteEmployee() {
    const employees = await db.findAllEmployees(); 
    const employeeChoices = employees.map( ({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`, 
        value: id
    })); 
    const {employeeId} = await inquirer.prompt([
        {
            type: 'list', 
            name: 'employeeId', 
            message: 'select the employee you want to remove', 
            choices: employeeChoices
        }
    ]); 
    await db.deleteEmployee(employeeId); 
    console.log(`Removed employee from the database`); 

    startMenu(); 
}
//role
async function viewRoles() {
    const role = await db.findAllRoles(); 
    console.log(`\n`); 
    console.table(role); 

    startMenu(); 
}
async function addRole() {
    const departments = await db.findAllDepartments(); 
    const departmentChoices = departments.map( ({id, name}) => ({
        name: name, 
        value: id
    })); 
    const role = await inquirer.prompt([
        {
            name: 'title', 
            message: 'what role are you adding?'
        }, 
        {
            name: 'salary', 
            message: 'what is the associated salary for this role?'
        }, 
        {
            type: 'list', 
            name: 'department_id', 
            message: 'which department for this role?', 
            choices: departmentChoices
        }
    ]); 
    await db.addRole(role); 
    console.log(`Added ${role.title} to the database`); 

    startMenu(); 

}
async function updateRole() {
    const employees = await findAllRoles(); 
    const employeeChoices = employees.map( ({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`, 
        value: id 
    })); 
    const {employeeId} = await inquirer.prompt([
        {
            type: 'list', 
            name:'employeeId', 
            message: 'select employee to update', 
            choices: employeeChoices
        }
    ]); 
    const roles = await db.findAllRoles(); 
    const roleChoices = roles.map( ({id, title}) => ({
        name: title, 
        value: id
    })); 
    const {roleId} = await inquirer.prompt([
        {
            type: 'list', 
            name: 'roleId', 
            message: 'select role to assign to employee', 
            choices: roleChoices
        }
    ]); 
    await db.updateRole(employeeId, roleId); 
    console.log(`employee role updated`); 

    startMenu(); 
}
async function deleteRole() {
    const roles = await db.findAllRoles(); 
    const roleChoices = roles.map( ({id, title}) => ({
        name: title, 
        value: id
    })); 
    const {roleId} = await inquirer.prompt([
        {
            type: 'list', 
            name: 'roleId', 
            message: 'Select the role to remove: (WARNING: this will also remove associate employees)', 
            choices: roleChoices
        }
    ]); 
    await db.deleteRole(roleId); 
    console.log(`Role removed from database`); 

    startMenu(); 
}
//bonus 
async function viewByManager() {
    const managers = await db.findAllEmployees(); 
    const managerChoices = managers.map( ({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`, 
        value: id
    })); 
    const {managerId} = await inquirer.prompt([
        {
            type: 'list', 
            name: 'managerId', 
            message: 'Select employee to view report', 
            choices: managerChoices
        }
    ]); 
    const employees = await db.findManagers(managerId);
    console.log(`\n`); 
    
    if (employees.length === 0) {
        console.log(`No report for this employee`); 
    } else {
        console.table(employees); 
    }
    startMenu(); 
}
async function updateManager()  {
    const employees = await db.findAllEmployees(); 
    const employeeChoices = employees.map( ({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
    })); 
    const {employeeId} = await inquirer.prompt([
        {
            type: 'list', 
            name: 'employeeId', 
            message: 'select employee manager to update',
            choices: employeeChoices
        }
    ]); 
    const managers = await db.findManagers(employeeId); 
    const managerChoices = managers.map( ({id, first_name, last_name}) => ({
        name: `${first_name, last_name}`, 
        value: id
    })); 
    const {managerId} = await inquirer.prompt([
        {
            type: 'list', 
            name: 'managerId', 
            message: 'Who will be manager for the selected employee?', 
            choices: managerChoices
        }
    ]); 
    await db.updateManager(employeeId, managerId); 
    console.log(`Employee manager updated in database`); 

    startMenu(); 
}
//exit
function exitProgram() {
    console.log(`Goodbye`); 
    process.exit(); 
}
// async function utilBudget() {
//     const departments = await db.findAllDepartments(); 
//     const totalBudget = 
// }
//db methods 
//findAllEmployees()
//addEmployee()
//updateEmployee()
//deleteEmployee()

//findAllDepartments()
//addDepartment()
//updateDepartment()
//deleteDepartment()

//findAllRoles()
//addRole()
//updateRole()
//deleteRole()

//findManagers()
//updateManager()