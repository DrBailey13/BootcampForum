let mysql = require('mysql');

let connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
  connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: ''
  });
}
// Make connection.
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;



// let Sequelize = require('sequelize');

// // Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
// let sequelize = new Sequelize('sequelize_chirpy', 'root', '', {
//   host: 'localhost',
//   port: 3306,
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });

// // Exports the connection for other files to use
// module.exports = sequelize;