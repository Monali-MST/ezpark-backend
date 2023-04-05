const express = require('express')
const router = express.Router()

var get_badges = require('../api_operations_1/operations_1/show_p_system_details/get_badges')
var get_pointActions = require('../api_operations_1/operations_1/show_p_system_details/get_pointActions')
var get_discounts = require('../api_operations_1/operations_1/show_p_system_details/get_discounts')
var get_Refund_Level = require('../api_operations_1/operations_1/refund/get_Refund_Level')
var get_refund_request = require('../api_operations_1/operations_1/refund_request/get_refund_request')
var send_refund_request = require('../api_operations_1/operations_1/refund_request/send_refund_request')
var reject_refund_request = require('../api_operations_1/operations_1/refund_request/reject_refund_request')
const save_payment_details = require('../api_operations_1/operations_1/payment/save_payment_details')
// var pay = require('../api_operations/operations_1/show_system_details/get_Refund_Level')


router.get('/get/badges' ,(req,res,next)=>{
    get_badges(req , res)
})

router.get('/get/pointActions' ,(req,res,next)=>{
    get_pointActions(req , res)
})

router.get('/get/discounts' ,(req,res,next)=>{
    get_discounts(req , res)
})

router.get('/get/refund_level' ,(req,res,next)=>{
    get_Refund_Level(req , res)
})

router.get('/get/get_refund_request' ,(req,res,next)=>{        
    get_refund_request(req , res)
})

router.post('/post/send_refund_request' ,(req,res,next)=>{        
    send_refund_request(req , res)
})

router.delete('/response/reject_refund_request:id' ,(req,res,next)=>{        
    reject_refund_request(req , res)
})

router.post('/pay/save_payment_details' ,(req,res,next)=>{        
    save_payment_details(req , res)
})

module.exports = router