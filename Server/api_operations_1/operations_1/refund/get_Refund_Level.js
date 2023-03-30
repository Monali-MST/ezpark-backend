
var connection = require('../../../service/connection');

// Define the 'get_Refund_Level' function and make it asynchronous
module.exports = async function get_Refund_Level(req, res) {

  const q = "SELECT * FROM Refund_Level;";

  connection.query(q, (err, data) => {
    // If there's an error, return it as a JSON response
    if (err) return res.json(err);
    // If the query is successful, return the result as a JSON response
    return res.json(data);
  });
}
