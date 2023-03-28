var express = require('express')
var bodyparser = require('body-parser')
var cors = require('cors')
var path = require('path')
const dotenv = require('dotenv');
var app = express();
const auth_router = require('./routes/auth_router')
dotenv.config();

app.use(cors())
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,'public')))
app.use('/api/auth',auth_router)


app.listen(process.env.PORT,()=>{
    console.log('server started in port : ',process.env.PORT)
})