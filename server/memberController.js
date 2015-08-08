var govTrack = require('govtrack-node');
var Promise = require('bluebird');
// var utils = require('./utilController');

var promiseGov = Promise.promisifyAll(govTrack);
// for (var keys in promiseGov) console.log(keys);
// console.log(promiseGov.findRoleAsync);


module.exports = {
  
  getAllMembers: function(callback) {
    // parameter finds only current members of Congress in API request
    promiseGov.findRoleAsync({  current: true, 
                                limit: 600, 
                                fields: 'person__id,person__firstname,person__lastname,person__name' 
                              })
      .then(function(res){
        callback(res.objects);
      })
      .catch(function(err){
        console.log('Error in getAllMembers:', err);
      });
  },

  getMember: function(id, callback) {
    promiseGov.findPersonAsync({id: id})
      .then(function(res){
        callback(res);
      })
      .catch(function(err){
        console.log('Error in getMember:', err);
      });
  },

  getMemberVotes: function(person_id, callback) {
    promiseGov.findVoteVoterAsync({person: person_id, sort: '-created', limit: 600})
      .then(function(res){
        callback(res.objects);
      })
      .catch(function(err){
        console.log('Error in getMemberVotes:', err);
      });
  }
};