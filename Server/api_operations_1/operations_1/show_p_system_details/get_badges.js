
var connection = require('../../../service/connection')

// Export a function to handle GET requests for badge data
module.exports = async function get_badges(req, res) {

  const q = "SELECT * FROM Badge_Details;";

  // Execute the SQL query and return the results
  connection.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
}
