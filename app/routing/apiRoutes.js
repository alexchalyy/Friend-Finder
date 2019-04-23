// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
//
// Written by Alex Chalyy on 4/20/2019.
// ===============================================================================

var friendData = require("../data/friends");
var sums = [];
//var waitListData = require("../data/waitinglistData");


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
    res.json(friendData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  function MatchIndex() {

    //  This function returns the index of the best match.

    var match = 0;

    if (friendData.length < 2) {
      return match;
    } else {
      for (var m = 0; m < (friendData.length - 2); m++) {
        var dif1 = Math.abs(parseInt(sums[m]) - parseInt(sums[sums.length - 1]));
        var dif2 = Math.abs(parseInt(sums[m + 1]) - parseInt(sums[sums.length - 1]));
        console.log("dif1 = " + dif1);
        console.log("dif2 = " + dif2);
        if (dif1 > dif2) {
          match = m + 1;
        } else match = m;
      }
      console.log("match = " + match);
      return match;
    }
  }

  //---------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
      

      for (var i = 0; i < friendData.length; i++) {
        //friendList.push(friendData[i].name);
        //pics.push(friendData[i].photo);
        s = 0;
        for (var c = 0; c < friendData[i].scores.length; c++) {
          s += parseInt(friendData[i].scores[c]);
        }
        sums.push(s);
      }
      var match = MatchIndex();
      sums = [];
      //console.log("photo:");
      //console.log(pics);
      res.send(friendData[match]);
      friendData.push(req.body);
  });
};
