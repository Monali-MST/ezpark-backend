var connection = require('../../../service/connection');

module.exports = async function static_booked_slots(req, res){
    const queryBS= "SELECT * FROM slot WHERE availability=0 AND Enability=1;"
    let bookedSlots;
    db.query(queryBS,(errorBS, resultsBS)=>{
      if(errorBS)return res.json(errorBS);
      bookedSlots = 0;
      resultsBS.forEach(row1=>{
        bookedSlots++;
      });
      return res.json({ bookedSlots });
    });
  }