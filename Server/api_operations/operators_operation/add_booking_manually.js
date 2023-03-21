var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function add_booking_manually(req , res){
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
    var sql = "SELECT * FROM slot WHERE slot_id = "+req.params.slot_id
    connection.query(sql, function (err, result0, fields) {
        if (err) res.send(err);
        if(!result0[0].availability){
            res.send("notavailable")
            return
        }
        var sql = "INSERT INTO booking (booked_date , start_time ,end_time ,rate ,review ,vehicle_no , booking_method , slot_id) " + "VALUES ('"+req.body.BookedDate+"','"+req.body.start_time+"','"+req.body.end_time+"','"+req.body.rate+"','"+req.body.review+"','"+req.body.vehicle_no+"','"+req.body.booking_method+"','"+req.params.slot_id+")"
        connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        var sql = "UPDATE slot " + "SET availability = FALSE WHERE slot_id = "+req.params.slot_id
        connection.query(sql, function (err, result2, fields) {
            if (err) res.send(err);
            console.log(result2)
            })
        });
        res.send("success")
    })
    
}