// Import the 'mysql' module
var mysql = require('mysql');

// Create a connection to a MySQL database
var connection = mysql.createConnection({
  host: "ezpark-db.cvhbqqtsx1je.ap-northeast-1.rds.amazonaws.com",
  user: "admin",
  password: "ezPark!123",
  database: "EzPark",
});

// Attempt to connect to the database
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Ezpark database.");
});

// Export the 'connection' object so that it can be used by other modules
module.exports = connection;
