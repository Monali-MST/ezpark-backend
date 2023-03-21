const express = require('express')
const router = express.Router()
var add_booking_manually = require('../api_operations/operators_operation/add_booking_manually');
var get_bookings = require('../api_operations/operators_operation/get_bookings')
var get_bookings_today = require('../api_operations/operators_operation/get_bookings_today')
var get_payment = require('../api_operations/operators_operation/get_payment')


router.post('/add/booking/:slot_id' ,(req,res,next)=>{
    add_booking_manually(req , res)
})

router.get('/bookings' ,async (req,res,next)=>{
    get_bookings(req , res)
})

router.get('/bookingsByDate' ,async (req,res,next)=>{
    get_bookings_today(req , res)
})

router.get('/payment/:booking_id' ,async (req,res,next)=>{
    get_payment(req , res)
})


module.exports = router