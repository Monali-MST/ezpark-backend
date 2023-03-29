var connection = require("../../../service/connection");

module.exports = async function send_refund_request(req, res) {
    const Refund_Request_id = req.params.id;
    const sql = "DELETE FROM `EzPark`.`Refund_Request` WHERE (`Refund_Request_id` = ?);";
  
    connection.query(sql, [Refund_Request_id], (err, data) => {
      if (err) return res.json(err);
      return res.json("Request has been Removed Successfully");
    });
};