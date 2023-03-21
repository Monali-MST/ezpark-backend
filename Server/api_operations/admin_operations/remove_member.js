var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function removeMember(req , res){
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
    var sql = "DELETE FROM user WHERE user_id = "+req.params.user_id
    connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        console.log(result)
        var sql2 = "DELETE FROM admin WHERE user_id = "+req.params.user_id
        connection.query(sql2, function (err, result2, fields) {
            if (err) res.send(err);
            console.log(result2)
        });
    });
    res.send("success")
}