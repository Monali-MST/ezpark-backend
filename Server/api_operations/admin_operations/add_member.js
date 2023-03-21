var connection = require('../../service/connection')
var generate_username = require('../../generate_username/generate_username')
var generate_password = require('../../generate_username/generate_password')
var sendMail = require('../../send_mails/send_mails')
var validate_token = require('../../authentication/authenticate')

module.exports = async function add_member(req , res){
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
    console.log(req.body)
    var sql = "INSERT INTO user (firstname , lastname ,email ,nic ,contact ,superadmin_status) " + "VALUES ('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.email+"','"+req.body.nic+"','"+req.body.contact+"','pending')"
    connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        console.log(result)
        const password = generate_password()
        const username = generate_username(req.body.firstname , result.insertId)
        const response = {
            "username" : username ,
            "password" : password
        }
        var sql2 = "INSERT INTO admin (user_id , position) " + "VALUES ("+result.insertId+",'"+req.body.position+"')"
        connection.query(sql2, function (err, result2, fields) {
            if (err) res.send(err);
            console.log(result2)
            var sql3 = "UPDATE user " + "SET username = '"+username+"', password = '"+password+"' WHERE user_id = "+result.insertId
            connection.query(sql3, function (err, result3, fields) {
                if (err) res.send(err);
                console.log(result3)
              });
          });
        var mailBody = "Your username is : '"+username+"' And password is : '"+password+"'"
        var mailSubject = "Username And Password"
        sendMail(req.body.email , mailSubject , mailBody)
        res.send(response)
        return
      }); 
}