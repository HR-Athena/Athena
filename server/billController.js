var govTrack = require('govtrack-node');
var Promise = require('bluebird');
var utils = require('./utilController');

var promiseGov = Promise.promisifyAll(govTrack);

module.exports = {

  getBillInformation: function(bill_id, callback) {
    promiseGov.findVoteAsync({id: bill_id})
      .then(function(res){
        callback(res);
      })
      .catch(function(err){
        console.log('Error in getBillInformation:', err);
      });
  }

};