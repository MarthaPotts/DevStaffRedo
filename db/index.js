const connection = require('./db/connection'); 

class DB {
    constuctor(connection) {
        this.connection = connection; 
    }
    //add methods
    //employees
    findAllEmployees() {
        return this.connection.query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN deparatment ON role.department_id = department.id LEFT JOIN employee manager on managaer.id = employee.manager_id;'
        ); 
    }
    addEmployee(employee) {
        return this.connection.query(
            'INSERT INTO employee SET ?', employee
        ); 
    }
    updateEmployee(employeeId, roleId) {
        return this.connection.query(
            'UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]
        ); 
    }
    deleteEmployee(employeeId) {
        return this.connection.query(
            'DELETE FROM employee WHERE id = ?', employeeId
        ); 
    }
    //departments 
    findAllDepartments() {
        return this.connection.query(
            'SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name'
        ); 
    }
    addDepartment(department) {
        return this.connection.query(
            'INSERT INTO department SET ?', department
        ); 
    }
    updateDepartment(departmentId) {
        return this.connection.query(
            'UPDATE department SET department_id WHERE id = ?', departmentId
        ); 
    }
    deleteDepartment(departmentId) {
        return this.connection.query(
            'DELETE FROM department WHERE id = ?', departmentId
        );
    }
    //roles 
    findAllRoles() {
        return this.connection.query(
            'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;'
        ); 
    }
    addRole(role) {
        return this.connection.query(
            'INSERT INTO role SET ?', role
        ); 
    }
    deleteRole(roleId) {
        return this.connection.query(
            'DELETE FROM role WHERE id = ?', roleId
        ); 
    }
    //bonus 
    findManagers(mangerId) {
        return this.connection.query(
            'SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?',
            managerId
        ); 
    }
    updateManager(managerId, employeeId) {
        return this.connection.query(
            'UPDATE employee SET manager_id = ? WHERE id =?', [managerId, employeeId]
        ); 
    }
}
module.exports = new DB(connection); 