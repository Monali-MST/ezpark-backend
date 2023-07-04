const queries = {


  //userregister
  insert_user_details:
    "INSERT INTO `EzPark`.`User_Details` (`FirstName`, `LastName`, `AddFLine`, `AddSLine`, `Street`, `City`, `PostCode`, `MobileNo`, `FixedLine`, `NIC`, `Email`,`Password`) VALUES (?)",

  //userlogin
  get_user_UN_PW:
    "SELECT*FROM `EzPark`.`User_Details` WHAERE `Fname`=? AND `Pword`=?",

  //vehicle
  save_vehicle_details:
    "INSERT INTO `EzPark`.`Vehicle` (`VehicleNo`, `VehicleType`,`Email`) VALUES (?);",
  get_vehicleNo_by_email:
    "SELECT VehicleNo FROM ezpark.vehicle WHERE Email =?;",
    get_vehicles_by_email:
    "SELECT VehicleType,VehicleNo FROM ezpark.vehicle WHERE Email =?;",
  //otp
  delete_otp: "DELETE FROM ezpark.otp WHERE identifier=(?)",
  insert_otp:
    "INSERT INTO `ezpark`.`otp` (`identifier`, `otp_val`) VALUES ((?), (?));",
  get_otp_by_id: "SELECT otp_val FROM ezpark.otp WHERE identifier=(?)",

  //booking
  set_temp_booking_endtime:
    "UPDATE ezpark.temp_booking SET EndTime = ? WHERE BookingID = ?",
 
  search_userdetails_by_email:"SELECT * FROM ezpark.user_details where Email = ?",
  save_booking:
    "INSERT INTO `ezpark`.`booking` (`BookingID`, `BookedDate`, `StartTime`, `EndTime`, `VehicleNo`, `BookingMethod`) VALUES (?);",
  get_user_Bookings:"SELECT * FROM ezpark.booking where user_email=?;",

 save_tempto_bookings: "INSERT INTO `ezpark`.`booking` (`BookingID`,`BookedDate`, `StartTime`, `EndTime`, `VehicleNo`, `BookingMethod`,`slot`,`user_email`) VALUES (?);",
 delete_booking_details:"DELETE FROM ezpark.temp_booking WHERE BookingID=(?)",
 get_booking_from_temp:"SELECT * FROM ezpark.temp_booking where user_email=?;", 
 //user
  get_userID_by_email: "SELECT UserID FROM ezpark.user_details WHERE Email =?;",
  get_userDetails_by_email:"SELECT FirstName,LastName,City,MobileNo,Email,Password FROM ezpark.user_details WHERE Email =(?);",
};


module.exports = queries;
