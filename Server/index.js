import {} from 'dotenv/config'

import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());


//------Connect to the Database----------
const db = mysql.createConnection({
  host: "ezpark-db.cvhbqqtsx1je.ap-northeast-1.rds.amazonaws.com",
  user: "admin",
  password: "ezPark!123",
  database: "EzPark",
});

app.get("/", (req, res) => {
  res.json("Hello this is backend of EzPark");
});


//---------------------stripe CheckoutPayButton API start-----------------------
app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Slot Name: Zone C -20" }]
])

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `http://localhost:3000/successpay`,
      cancel_url: `http://localhost:3000/closepay`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

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
//   ];

//   db.query(q, [values[0]+values[1], userId], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("book has been updated successfully");
//   });
// });



//------Static View Page Backend---------------------------------
//BOOKINGS AND CANCELLATIONS STARTS
app.get ("/bookingDaily",(req, res)=>{//daily dookings and cancellations
  const query1="SELECT *FROM Booking WHERE BookedDate=date (now()) ;";
  const query2= "SELECT * FROM BookingCancellation WHERE CancelDate=date (now()) ;";
  let Booking, Cancellation;
  db.query(query1, (error1, results1) => {
      if (error1) return res.json(error1);
      Booking = 0;
      results1.forEach(row1 => {
        Booking++;
      });
  
      db.query(query2, (error2, results2) => {
        if (error2) return res.json(error2);
         Cancellation = 0;
        results2.forEach(row2 => {
          Cancellation ++;
        });
        res.json({ Booking,Cancellation });
      });
    });
});

app.get ("/bookingWeekly",(req, res)=>{//bookings and cancellation of the week
  const query1="SELECT * FROM Booking where BookedDate between adddate(now(),-7) and now();"
  const query2="SELECT * FROM BookingCancellation where CancelDate between adddate(now(),-7) and now();"
  let Booking,Cancellation;
  
  db.query(query1, (error1, results1) => {
    if (error1) return res.json(error1);
    Booking = 0;
    results1.forEach(row1 => {
    Booking++;
  });

  db.query(query2, (error2, results2) => {
    if (error2) return res.json(error2);
    Cancellation = 0;
    results2.forEach(row2 => {
    Cancellation ++;
  });

    res.json({ Booking,Cancellation });
    });
  });
});

  app.get("/bookingMonthly", (req, res) => {//booking and cancellation of this month
    const query1 = "SELECT * FROM Booking WHERE MONTH(BookedDate)=MONTH(now());";
    const query2 = "SELECT * FROM BookingCancellation Where month(CancelDate)=month(now());";
    let Booking,Cancellation;
  
    db.query(query1, (error1, results1, fields1) => {
      if (error1) return res.json(error1);
      Booking = 0;
      results1.forEach(row1 => {
        Booking++;
      });
  
      db.query(query2, (error2, results2, fields2) => {
        if (error2) return res.json(error2);
         Cancellation = 0;
        results2.forEach(row2 => {
          Cancellation ++;
        });

        res.json({ Booking,Cancellation });
      });
    });
  });
//BOOKINGS AND CANCELLATIONS ENDS

//REVENUE PART BEGINS
app.get("/revenueMonthly", (req,res)=>{//MONTHLY
  const queryMR="SELECT PaymentDate,SUM(PaymentAmount) AS TotalRevenueMonthly FROM Payment_Details WHERE MONTH(PaymentDate)=MONTH(now()) GROUP BY date(PaymentDate) ORDER BY date(PaymentDate);";
  db.query(queryMR, (error, results, fields) =>{
      if(error) return res.json(error)
      const rows=results.map(row => {
          const UserData={};
          fields.forEach(field =>{
              UserData[field.name] = row[field.name];
          });
          return UserData;
      });
      return  res.json(rows);
      });
})

app.get("/revenueWeekly", (req,res)=>{//WEEKLY
  const queryW="SELECT PaymentDate, (PaymentAmount) AS TotalRevenueWeekly FROM Payment_Details WHERE PaymentDate BETWEEN date (now())-6 AND date (now())+1 GROUP BY date(PaymentDate) ORDER BY date(PaymentDate);";
  db.query(queryW, (error, results, fields) =>{
      if(error) return res.json(error)
      const rows=results.map(row => {
          const UserData={};
          fields.forEach(field =>{
              console.log(row);
              UserData[field.name] = row[field.name];
          });
          return UserData; 
      });
      return  res.json(rows);
      });
})

app.get("/revenueDaily", (req,res)=>{//DAILY
  const queryD="SELECT PaymentDate, SUM(PaymentAmount) AS TotalRevenueDaily FROM Payment_Details WHERE PaymentDate=date (now());";
  db.query(queryD, (error, results, fields) =>{
      if(error) return res.json(error)
      const rows=results.map(row => {
          const UserData={};
          fields.forEach(field =>{
              UserData[field.name] = row[field.name];
          });
          return UserData;
      });
      
      return  res.json(rows); 
      });
})
//REVENUE PART ENDS

//FULL AND PARTIAL REFUNDS BEGIN
app.get("/refundFPDaily", (req,res)=>{//DAILY
  const queryRFPD="SELECT rd.RefundDate,COALESCE(full.TotalFullRefunds, 0) AS TotalFullRefunds, COALESCE(partial.TotalPartialRefunds, 0) AS TotalPartialRefunds FROM Refund_Details rd LEFT JOIN (SELECT date(RefundDate) AS RefundDate, SUM(Refund_amount) AS TotalFullRefunds FROM Refund_Details INNER JOIN Refund_Level ON Refund_Details.Refund_level_id = Refund_Level.Refund_level_id WHERE RefundDate=date(now()) AND Refund_percentage = 100 GROUP BY date(RefundDate)) full ON rd.RefundDate = full.RefundDate LEFT JOIN (SELECT date(RefundDate) AS RefundDate,SUM(Refund_amount) AS TotalPartialRefunds FROM Refund_Details INNER JOIN Refund_Level ON Refund_Details.Refund_level_id = Refund_Level.Refund_level_id WHERE RefundDate=date(now()) AND Refund_percentage = 50 GROUP BY date(RefundDate)) partial ON rd.RefundDate = partial.RefundDate WHERE rd.RefundDate = date(NOW()) GROUP BY rd.RefundDate;";
  db.query(queryRFPD, (error, results, fields) =>{
      if(error) return res.json(error)
      const rows=results.map(row => {
          const UserData={};
          fields.forEach(field =>{
              UserData[field.name] = row[field.name];
          });
          return UserData;
      });
      
      return  res.json(rows); 
      });
})


   app.get("/refundFPWeekly", (req,res)=>{//WEEKLY
      const queryRFPW="SELECT rd.RefundDate,COALESCE(full.TotalFullRefunds, 0) AS TotalFullRefunds, COALESCE(partial.TotalPartialRefunds, 0) AS TotalPartialRefunds FROM Refund_Details rd LEFT JOIN (SELECT date(RefundDate) AS RefundDate, SUM(Refund_amount) AS TotalFullRefunds FROM Refund_Details INNER JOIN Refund_Level ON Refund_Details.Refund_level_id = Refund_Level.Refund_level_id WHERE RefundDate BETWEEN date (now())-6 AND date (now()) AND Refund_percentage = 100 GROUP BY date(RefundDate)) full ON rd.RefundDate = full.RefundDate LEFT JOIN (SELECT date(RefundDate) AS RefundDate,SUM(Refund_amount) AS TotalPartialRefunds FROM Refund_Details INNER JOIN Refund_Level ON Refund_Details.Refund_level_id = Refund_Level.Refund_level_id WHERE RefundDate BETWEEN date (now())-6 AND date (now()) AND Refund_percentage = 50 GROUP BY date(RefundDate)) partial ON rd.RefundDate = partial.RefundDate WHERE rd.RefundDate BETWEEN date (now())-6 AND date (now()) GROUP BY rd.RefundDate ORDER BY rd.RefundDate;";
      db.query(queryRFPW, (error, results, fields) =>{
          if(error) return res.json(error)
          const rows=results.map(row => {
              const UserData={};
              fields.forEach(field =>{
                  UserData[field.name] = row[field.name];
              });
              return UserData;
          });
          
          return  res.json(rows); 
          });
  })   

app.get("/refundFPMonthly", (req,res)=>{//MONTHLY
  const queryRFPM="SELECT rd.RefundDate,COALESCE(full.TotalFullRefunds, 0) AS TotalFullRefunds, COALESCE(partial.TotalPartialRefunds, 0) AS TotalPartialRefunds FROM Refund_Details rd LEFT JOIN (SELECT date(RefundDate) AS RefundDate, SUM(Refund_amount) AS TotalFullRefunds FROM Refund_Details INNER JOIN Refund_Level ON Refund_Details.Refund_level_id = Refund_Level.Refund_level_id WHERE MONTH(RefundDate) = MONTH(NOW()) AND Refund_percentage = 100 GROUP BY date(RefundDate)) full ON rd.RefundDate = full.RefundDate LEFT JOIN (SELECT date(RefundDate) AS RefundDate,SUM(Refund_amount) AS TotalPartialRefunds FROM Refund_Details INNER JOIN Refund_Level ON Refund_Details.Refund_level_id = Refund_Level.Refund_level_id WHERE MONTH(RefundDate) = MONTH(NOW()) AND Refund_percentage = 50 GROUP BY date(RefundDate)) partial ON rd.RefundDate = partial.RefundDate WHERE MONTH(rd.RefundDate) = MONTH(NOW()) GROUP BY rd.RefundDate ORDER BY rd.RefundDate;";
  db.query(queryRFPM, (error, results, fields) =>{
      if(error) return res.json(error)
      const rows=results.map(row => {
          const UserData={};
          fields.forEach(field =>{
              UserData[field.name] = row[field.name];
          });
          return UserData;
      });
      
      return  res.json(rows); 
      });
})
//FULL AND PARTIAL REFUNDS END




//------User Registration page Backend----------
app.get("/user", (req, res) => {
  const query = "SELECT * FROM User_Details";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/user", (req, res) => {
  const query =
    "INSERT INTO `EzPark`.`User_Details` (`FirstName`, `LastName`, `AddFLine`, `AddSLine`, `Street`, `City`, `PostCode`, `MobileNo`, `FixedLine`, `NIC`, `Email`,`Password`) VALUES (?);";
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
    return res.json("User account has been  created succefully");
  });
});


//------Connect to the Backend Server----------
app.listen(8800, () => {
  console.log("Connected to backend!!");
});
