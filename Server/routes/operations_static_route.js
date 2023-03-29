const express = require('express')
const router = express.Router()


var stat_booked_slots = require('../api_operations_1/operations_static/static_slot_count/static_booked_slots');


router.get('/bookedSlots' ,(req,res,next)=>{
    stat_booked_slots(req, res);
})


module.exports = router