const mysql =  require('mysql2');
const dotenv = require('dotenv');


dotenv.config();   
let connection;
connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user:process.env.DB_USER,
  password: process.env.DB_PASSWORD,

});


connection.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySql Connected");
  });


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to MySQL database as ID:', connection.threadId);
 });

module.exports = connection;


