const express = require('express')
const router = express.Router()
var login = require('../api_operations/admin_operations/public_operations/login');


router.post('/login' ,(req,res,next)=>{
    login(req , res)
})




module.exports = router
