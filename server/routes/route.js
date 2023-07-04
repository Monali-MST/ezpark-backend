const express = require('express');
const { register, verifyUser, login, getUser, resetPassword } = require('../api_operations/login/register');
const vehicle_registration = require('../api_operations/vehicle_register/vehicle_registration');

const savebooking = require('../api_operations/booking/savebooking');

const getUserVehicleDetails = require('../api_operations/user/getUserVehicleDetails');

const getUserProfile=require('../api_operations/user/userProfile')
const { registerMail } = require('../controllers/mailer');

const { deleteBookings } = require('../api_operations/booking/deletebooking');
const { localVariables } = require('../middleware/Auth');
const { generateOTP, verifyOTP } = require('../api_operations/OTP/otp');
const { sendSMS } = require('../controllers/sms');
const { getbookingfromtemp } = require('../api_operations/booking/getbookingfromtemp');
const { saveTbookings } = require('../api_operations/booking/saveTbookings');
const { saveTobooking } = require('../api_operations/booking/saveTobooking');
const { Extendtime } = require('../api_operations/booking/Extendtime');
const getUserId = require('../api_operations/user/getUserId');
const getUserBooking = require('../api_operations/user/getUserBooking');
const getVehicles = require('../api_operations/user/getVehicles');

const router = express.Router()


router.route('/register').post(register); // register user
router.route('/login').post(verifyUser, login); // login in app
router.route('/verifyEmail').post(getUser);
router.route('/generateOTP').get( localVariables, generateOTP) // generate random OTP
router.route('/verifyOTP').get(verifyOTP) // verify generated OTP
router.route('/resetPassword').put(resetPassword); // register user



router.route('/vehicles').post(vehicle_registration);



router.route('/sendMail').post(registerMail);
router.route('/sendSMS').post(sendSMS);

router.route('/timeExtend').put(Extendtime);
router.route('/savebooking').post(savebooking);

router.route('/getUserId/:email').get(getUserId);

router.route('/getUserVehicleDetails/:email').get(getUserVehicleDetails);
router.route('/getVehicles/:email').get(getVehicles);

//bookings
router.route('/getUserBookings/:email').get(getUserBooking);
router.route('/savetemptobooking').post(saveTobooking);
 router.route('/savetempbooking').post(saveTbookings);
router.route('/getbookingfromtemp/:email').get(getbookingfromtemp);
router.route('/deletebooking/:id"').delete(deleteBookings);


router.route('/getUserProfile/:email').get(getUserProfile);

module.exports = router;