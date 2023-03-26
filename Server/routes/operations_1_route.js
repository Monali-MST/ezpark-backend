const express = require('express')
const router = express.Router()

var get_badges = require('../api_operations/operations_1/show_system_details/get_badges')
var get_pointActions = require('../api_operations/operations_1/show_system_details/get_pointActions')
var get_discounts = require('../api_operations/operations_1/show_system_details/get_discounts')
var get_Refund_Level = require('../api_operations/operations_1/show_system_details/get_Refund_Level')
var send_refund_request = require('../api_operations/operations_1/show_system_details/get_discounts')
var pay = require('../api_operations/operations_1/show_system_details/get_Refund_Level')


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

router.get('/get/send_refund_request' ,(req,res,next)=>{        
    send_refund_request(req , res)
})

// post refund requests using, send_refund_request

// get refund requests using, get_refund_request



module.exports = router