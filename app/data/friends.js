// ===============================================================================
// DATA
// Below data will hold all of the reserved "friends.
// Initially we just set it equal to a "dummy" customer.
// But you could have it be an empty array as well.
//
// Written by Alex Chalyy on 4/19/2019.
// ===============================================================================

var friendArray = [
    {
      name: "Husky",
      photo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Siberian-husky.jpg",
      scores: ["5", "1", "4", "4", "5", "1", "2", "5", "4", "1"]
    },
    {
        name: "Samoyed",
        photo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Samoyed.jpg",
        scores: ["5", "1", "4", "1", "5", "1", "5", "5", "4", "5"]
      }
  ];
  
  // Note how we export the array. This makes it accessible to other files using require.
  module.exports = friendArray;
  