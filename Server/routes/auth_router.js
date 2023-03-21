const express = require('express')
const router = express.Router()
var login = require('../api_operations/admin_operations/public_operations/login');
var validate_token = require('../api_operations/admin_operations/public_operations/validate_token')
var update_admin = require('../api_operations/admin_operations/public_operations/update_admin')
var get_admin = require('../api_operations/admin_operations/public_operations/get_admin_profile')


router.post('/login' ,(req,res,next)=>{
    login(req , res)
})

router.get('/validate' ,async (req,res,next)=>{
    validate_token(req , res)
})

router.put('/admin/update' ,async (req,res,next)=>{
    update_admin(req , res)
})

router.get('/get/admin' ,async (req,res,next)=>{
    get_admin(req , res)
})


module.exports = router
