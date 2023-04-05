var connection = require("../../../service/connection");

module.exports = async function save_payment_details(req, res) {
  // console.log(body);
  const sql =
    "INSERT INTO `EzPark`.`payment_details` (`PaymentDate`, `PaymentAmount`, `Booking_id`) VALUES (?);";
  const values = [
    req.body.PaymentDate,
    req.body.PaymentAmount,
    req.body.Booking_id,
  ];
  connection.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(201).send("Payment details has been saved successfully");
  });
};
