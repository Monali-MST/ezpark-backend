import {} from "dotenv/config";

import express from "express";
import mysql from "mysql";
import cors from "cors";
import otpGenerator from "otp-generator";

import registerMail from "./mailer.js";

import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

let otp = null;

//------Connect to the Database----------
const db = mysql.createConnection({
  host: "ezpark-server.mysql.database.azure.com",
  user: "SuperAdmin",
  password: "ezPark@123",
  database: "ezpark",
});

app.get("/", (req, res) => {
  res.json("Hello this is backend of EzPark");
});

//---------------------stripe CheckoutPayButton API start-----------------------
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Slot Name: Zone C -20" }],
]);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:3000/successpay`,
      cancel_url: `http://localhost:3000/closepay`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//---------------------stripe CheckoutPayButton API end-----------------------

//------PointSystem details Page Backend----------
app.get("/badges", (req, res) => {
  const q = "SELECT * FROM EzPark.Badge_Details;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/pointActions", (req, res) => {
  const q = "SELECT * FROM EzPark.Point_Details;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/discounts", (req, res) => {
  const q = "SELECT * FROM EzPark.Discounts_Details;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/Refund_Level", (req, res) => {
  const q = "SELECT * FROM EzPark.Refund_Level;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//------PointSystem user points increment functions Backend----------
// app.get("/pointsadd", (req, res) => {
//   const q = "SELECT * FROM incrememtdb.user_details;";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.put("/pointsadd:iduser_details", (req, res) => {
//   const userId = req.params.iduser_details;
//   // let x = 100;
//   // x = x + 5;
//   const q =
//     "UPDATE `incrememtdb`.`user_details` SET `noofpoints` = ? WHERE (`iduser_details` = ?);";
//   const values = [
//     req.body.addPoints,
//     req.body.currentPoints,
//   ];s
//   db.query(q, [values[0]+values[1], userId], (err, data) => {
//     if (err) return res.json(err)s;
//     return res.json("book has been updated successfully");
//   });
// });

//------User Registration page Backend----------

app.get("/user", (req, res) => {
  const query = "SELECT * FROM User_Details";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/user", (req, res) => {
  console.log(req.body);
  const query =
    "INSERT INTO `EzPark`.`User_Details` (`FirstName`, `LastName`, `AddFLine`, `AddSLine`, `Street`, `City`, `PostCode`, `MobileNo`, `FixedLine`, `NIC`, `Email`,`Password`) VALUES (?)";
  const values = [
    req.body.Fname,
    req.body.Lname,
    req.body.AddFLine,
    req.body.AddSLine,
    req.body.Street,
    req.body.City,
    req.body.PCode,
    req.body.MobNum,
    req.body.FixedNum,
    req.body.Nic,
    req.body.Email,
    req.body.Pword,
  ];
  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Success");
  });
});

//-------veh-reg-----------
// export async function vehicle_reg(req, res) {
//   const {Vehical} = req.body;

//   Vehical_data.forEach((Vehical) => {
//     const values = [
//       Vehical.VehicleNo,
//       Vehical.VehicleType,

//     ];
//     const query =
//       "INSERT INTO `EzPark`.`Vehicle` (`VehicleNo`, `VehicleType`,`Email`) VALUES (?);";
//     // const values =[
//     //     req.body.VehicleNo,
//     //     req.body.Type,
//     //     req.body.Email
//     // ]
//     connection.query(query, [values], (err, data) => {
//       if (err) return res.json(err);
//       return res.json("Vehicel added succefully!!");
//     });
//   });
//   for (const vehical_item of Vehical) {
//       const values = [
//       Vehical.VehicleNo,
//       Vehical.VehicleType,

//     ];
//   }
// }
// export async function vehicle_reg(req, res) {
//   const {Vehical_data} = req.body;

//   for (const vehicle of Vehical_data) {
//     const query =
//       "INSERT INTO `EzPark`.`Vehicle` (`VehicleNo`, `VehicleType`,`Email`) VALUES (?);";
//     // const values =[
//     //     req.body.VehicleNo,
//     //     req.body.Type,
//     //     req.body.Email
//     // ]

//     const values = [
//       req.body.VehicleNo,
//       req.body.VehicleType,
//       req.body.Email,
//     ];
//     connection.query(query, [values], (err, data) => {
//       if (err) return res.json(err);
//       return res.json("Vehicel added succefully!!");
//     });
//   }
// }

// app.post("/vehicle", (req, res) => {
//   vehicle_reg(req, res);
// });

//--------Login page--------//
app.post("/login", (req, res) => {
  const query =
    "SELECT*FROM `EzPark`.`User_Details` WHAERE `Fname`=? AND `Pword`=?";
  db.query(query, [req.body.Fname, req.body.Pword], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.lenth > 0) {
      return res.json("Success");
    } else {
      return res.json("Failed");
    }
  });
});

// -----------------OTP-----------------

app.post("/generateOTP", (req, res) => {
  generateOTP(req, res);
});

app.post("/verifyOTP", (req, res) => {
  verifyOTP(req, res);
});

/** GET: http://localhost:8000/api/generateOTP */
export async function generateOTP(req, res) {
  otp = otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const apiURL = 'https://cloud.websms.lk/smsAPI?sendsms';
  const apiKey = 'hB8Y73E2OTVPBfEGhfBk9ddi95MOFDf7';
  const apiToken = 'sxX51677694785';
  const type = 'sms';
  const from = 'EzPark';
  const text = "Your EzPark verification code: ";
  const to = req.body.MobNum; // Replace with the actual phone number
  const url = `${apiURL}&apikey=${apiKey}&apitoken=${apiToken}&type=${type}&from=${from}&to=${to}&text=${text}${otp}`;
 
  
  axios.post(url)
  .then(response => {
    const query = "INSERT INTO `ezpark`.`otp` (`identifier`, `otp_val`) VALUES ((?), (?));";

    const values = [req.body.MobNum, otp];
    db.query(query, values, (err, data) => {
      if (err) return res.json(100);
      return res.json(200);
    });
  })
  .catch(error => {
    return res.json('API error:', error);
  });


  
  // return res.json(otp);
  // res.status(201).send({ code: otp, msg: "OTP" });
}

/** GET: http://localhost:8000/api/verifyOTP */
export async function verifyOTP(req, res) {
  const query = "SELECT otp_val FROM ezpark.otp WHERE identifier=(?)";
  const values = [[req.body.MobNum],[req.body.otp]];
  db.query(query, [values[0]], (err, data)=>{
    if(err){
      return res.json(100);
    }else if (data.length!=0){
      if(data[0].otp_val==values[1]){
        return res.json(200);
      }else{
        return res.json(300);
      }
    }else{
      return res.json(100);
    }
  })
  // const { code } = req.query;
  // console.log(otp);
  // if (parseInt(otp) === parseInt(code)) {
  //   otp = null; // reset the OTP value
  //   // otpSession = true; // start session for reset password
  //   return res.status(201).send({ msg: "Verify Successsfully!" });
  // }
  // return res.status(400).send({ error: "Invalid OTP" });
}

app.post("/registerMail", (req, res) => {
  registerMail(req, res);
});

//----------Save Bookings------------
app.post("/savebooking", (req, res) => {
  const data = req.body;
  const sql =
    "INSERT INTO `ezpark`.`booking` (`BookingID`, `BookedDate`, `StartTime`, `EndTime`, `VehicleNo`, `BookingMethod`) VALUES (?);";
  const values = [
    data.BookingID,
    data.BookedDate,
    data.StartTime,
    data.EndTime,
    data.VehicleNo,
    data.BookingMethod,
  ];
  db.query(sql, [values], function (err, result, fields) {
    if (err) {
      console.log(err);
      res.status(500).send({ err });
    } else {
      return res.status(201).send("Data saved successfully!");
    }
  });
});

//----------Forget password-------------
async function reset(req, res) {
  const { email } = req.body;
  const sql = "SELECT * FROM user_details WHERE Email ='?';";
  db.query(query, [email], (err, data) => {
    if (err) {
      return res.status(500).send("Username doesn't exist");
    } else {
      if (data.length > 0) {
        return res.status(404).send("Username  exist");
      } else {
        return res.status(404).send("Username doesn't exist");
      }
      // console.log(data);
    }
  });
}

app.post("/freset", (req, res) => {
  reset(req, res);
});

//-------Update profile-----------

// API endpoint for updating user profile
app.put("/api/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const { firstName, lastName, mobileNumber,email,password } = req.body;

  // Retrieve the user's current profile from the database
  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to retrieve user profile" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const user = results[0];

    // Update the user's profile with new values
    const updatedUser = {
      ...user,
      Fname: firstName || user.firstName,
      Lname: lastName || user.lastName,
      MobNo: mobileNumber || user.mobileNumber,
      email:email||user.email,
      password:password||user.password
    };

    // Save the updated profile to the database
    db.query(
      "UPDATE users SET name = ?, email = ?, bio = ? WHERE id = ?",
      [updatedUser.firstName, updatedUser.lastName, updatedUser.mobileNumber,updatedUser.email,updatedUser.password,userId],
      (err) => {
        if (err) {
          res.status(500).json({ error: "Failed to update user profile" });
          return;
        }

        res.json({ message: "User profile updated successfully" });
      }
    );
  });
});
//------Connect to the Backend Server----------
app.listen(8800, () => {
  console.log("Connected to backend!!");
});
