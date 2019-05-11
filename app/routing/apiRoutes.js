// ===============================================================================
// LOAD DATA for our friends data array

// ===============================================================================

var friendsData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================



module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

 

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/survey", function(req, res) {
    var nwfriend =req.body;
    var nwscore = nwfriend.scores;
    var newtot =  nwscore.reduce(function(total,amount){
        return (Number (total) + Number(amount))});
     console.log("inside api survey post");
    var matchindex;
    var compscore;
    var comptot;
   
    var  diffscore =200; // start at high number, so the first record will be a match as starting point
      for (i = 0; i< friendsData.length;i++){
           
       compscore= friendsData[i].scores
       comptot =  compscore.reduce(function(total,amount){
        return (Number(total) + Number( amount))});
          // do comparison with stored diffscore
        if (Math.abs(newtot - comptot) < diffscore){
                matchindex = i;
                // store the new lower value to diffscore
                diffscore = Math.abs(newtot - comptot);    
        }    
       

      }
       //  friendsData.push(nwfriend);
       friendsData.push(nwfriend); 
       res.json(  friendsData[matchindex]);
           
   
  
  });
 
};
