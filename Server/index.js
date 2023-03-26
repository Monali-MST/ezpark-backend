var express = require('express')
var bodyparser = require('body-parser')
var cors = require('cors')
var path = require('path')
const dotenv = require('dotenv');
var app = express();

var stripe_API = require('./stripe/stripe_API')
const operations_1_route = require('./routes/operations_1_route')

dotenv.config();

app.use(cors())
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,'public')))

app.use('/api/user',operations_1_route)


// stripe_API();      need to connect stripe api


app.listen(process.env.PORT,()=>{
    console.log('server started in port : ',process.env.PORT)
})