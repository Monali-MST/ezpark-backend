var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function update_slot(req , res){
    try{
        var validity = await validate_token(req , 1)
        console.log(validity)
        if (!validity.condition){
            res.send("not valid")
            return
        }
    }
    catch{
        console.log("catch")
        res.send("not valid")
        return
    }
    var sql = "UPDATE slot " + "SET slot_price = "+req.body.price+" WHERE slot_id = "+req.params.slot_id
    connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        console.log(result)
    });
    res.send("success")
}