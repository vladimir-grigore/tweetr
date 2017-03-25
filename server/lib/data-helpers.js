"use strict";

var ObjectID = require('mongodb').ObjectID;

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet, (err) => {
          callback(null, true);
        })
    },

    // Update the likes counter on a specific tweet
    likeTweet: function(tweetId, callback){
      var obj_id = new ObjectID(tweetId);
      db.collection("tweets").findOne({_id: obj_id}, (err, doc) => {
        let likes = doc.likes + 1;
        db.collection("tweets").update({_id: obj_id}, {$set: {likes: likes}}, (err) => {
          callback(null, true);
        });
      });

    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
      if (err) {
        return callback(err);
      }
        callback(null, tweets);
      });
    }

  };
}
