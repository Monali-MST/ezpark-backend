const connection = require('../../../service/connection');
const queries = require("../../../sql/sql");


async function updateDiscount(req, res) {
  const { exp_date, discount_data } = req.body;

  discount_data.forEach((discount) => {
    const values = [];
  });
  res.send(req.body);
}

module.exports = { updateDiscount };
