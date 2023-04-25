const express = require('express')
const router = express.Router()


//import files
const get_badges = require('../api_operations_1/operations_1/show_p_system_details/get_badges');
const get_pointActions = require('../api_operations_1/operations_1/show_p_system_details/get_pointActions');
const get_discounts = require('../api_operations_1/operations_1/show_p_system_details/get_discounts');
const get_Refund_Level = require('../api_operations_1/operations_1/refund/get_Refund_Level');
const get_refund_request = require('../api_operations_1/operations_1/refund_request/get_refund_request');
const send_refund_request = require('../api_operations_1/operations_1/refund_request/send_refund_request');
const reject_refund_request = require('../api_operations_1/operations_1/refund_request/reject_refund_request');
const save_payment_details = require('../api_operations_1/operations_1/payment/save_payment_details');
const { updatePoints } = require('../api_operations_1/operations_1/use_p_system/updatePoints');
const { assignBadges } = require('../api_operations_1/operations_1/use_p_system/assignBadges');
const { calculateDiscount } = require('../api_operations_1/operations_1/use_p_system/calculateDiscount');
const { updateDiscount } = require('../api_operations_1/operations_1/use_p_system/updateDiscount');



 //point system functions
 router.route('/updateUserPoints').put(updatePoints); // register user
 router.route('/getBadge').post(assignBadges); // register user
 router.route('/calculateDiscount').get(calculateDiscount); // register user
 router.route('/updateDiscount').put(updateDiscount); // register user

//point system details show page
router.route('/getbadges').get(get_badges);
router.route('/getpointActions').get(get_pointActions);
router.route('/getdiscounts').get(get_discounts);
router.route('/getrefund_level').get(get_Refund_Level);


//refund requests
router.route('/get_refund_request').get(get_refund_request);
router.route('/send_refund_request').post(send_refund_request);
router.route('/reject_refund_request:id' ).delete(reject_refund_request);

//payment
router.route('/save_payment_details').post(save_payment_details);

//refund


module.exports = router