const util = require('util'); 
const mysql = require('mysql'); 

const connection = mysql.createConnection(
    {
        host: 'localhost', 
        user: 'root', 
        password: '*SQLbb0973', 
        database: 'employees_db'
    }
); 
connection.connect(); 
console.log(`Database connection established`); 

connection.query = util.promisify(connection.query); 

module.exports = connection; 