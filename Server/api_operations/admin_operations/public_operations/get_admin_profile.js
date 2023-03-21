var connection = require('../../../service/connection')
var validate_token = require('../../../authentication/authenticate')

module.exports =async function get_admin_profile(req , res){
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
    connection.query("SELECT * FROM admin INNER JOIN user ON admin.user_id=user.user_id AND admin.user_id="+validity.userId, function (err, result, fields) {
        if (err) res.send(err);
        res.send(result)   
      });
}