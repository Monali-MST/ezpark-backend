var connection = require('../../../service/connection')
var validate_token = require('../../../authentication/authenticate')

module.exports = async function update_superadmin(req , res){
    try{
        var validity = await validate_token(req , 3)
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
    var sql = "UPDATE user " + "SET firstname = '"+req.body.firstname+"', lastname = '"+req.body.lastname+"' , email = '"+req.body.email+"' , nic = '"+req.body.nic+"' , contact = '"+req.body.contact+"' WHERE user_id = "+validity.userId
    connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        console.log(result)
    });
    res.send("success")
}