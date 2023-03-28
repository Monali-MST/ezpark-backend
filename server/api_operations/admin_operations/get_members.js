var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports =async function get_members(req , res){
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
    connection.query("SELECT * FROM user INNER JOIN admin ON user.user_id=admin.user_id", function (err, result, fields) {
        if (err) res.send(err);
        res.send(result)   
      });
}