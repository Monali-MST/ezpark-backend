var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

function format (date) {  
    if (!(date instanceof Date)){
      throw new Error('Invalid "date" argument. You must pass a date instance')
    }
  
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
  
    return `${year}-${month}-${day}`
  }

module.exports =async function get_bookings(req , res){
    try{
        var validity = await validate_token(req , 2)
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
    var date = format(new Date)
    console.log(date)
    console.log(date.toString())
    connection.query("SELECT * FROM booking WHERE booked_date = '"+date+"'", function (err, result, fields) {
        if (err) res.send(err);
        console.log(result)
        res.send(result)   
      });
}