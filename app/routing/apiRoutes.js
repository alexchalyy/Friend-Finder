// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
//
// Written by Alex Chalyy on 4/20/2019.
// ===============================================================================

var friendData = require("../data/friends");
var sums = [];

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
    var diff = [];

    if (friendData.length < 2)  {
      return match;
    } else  {
      for (var i = 0; i < (sums.length - 1); i++) {
        console.log("\nFriend index = " + i);
        console.log("Friend: " + friendData[i].name);
        console.log("sum = " + sums[i]);
        var d = Math.abs(parseInt(sums[i]) - parseInt(sums[sums.length - 1]));
        console.log("difference = " + d);
        diff.push(d);
      }
      for (var i = 0; i < diff.length; i++) {
        if (diff[match] > diff[i])  {
          match = i;
        }
      }
      console.log("\nMatch index = " + match);
      return match;
    }
  }

  //---------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
      
      friendData.push(req.body);
      for (var i = 0; i < friendData.length; i++) {
        s = 0;
        for (var c = 0; c < friendData[i].scores.length; c++) {
          s += parseInt(friendData[i].scores[c]);
        }
        sums.push(s);
      }
      var match = MatchIndex();
      sums = [];
      res.send(friendData[match]);
  });
};
