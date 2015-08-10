//Home Controller
// var angular = require('angular');
// var app = angular.module('congressmanprofile');

var Home = require('./homeFactory.js');

module.exports = function homeController($scope, Home){
  console.log('I am home controller');
  
  var selectedPerson = {};
  var recentSeaches = {};

  $scope.member = {};
  $scope.allMembers = {};
  $scope.billDetails = {};
  $scope.trendingMembers = [];
  
  /*******************************************
   * Capture the input from the user
   ******************************************/

  $scope.selectPerson = function(newPerson){
    // newPerson will be an object:
    // {id: id, firstName: FirstName, lastName: LastName, ??} 
    selectedPerson = newPerson;
    $scope.trendingMembers.push(selectedPerson[id]);
  };

  /*******************************************
   * Loads All Members Name and ID from Factory
   ******************************************/

  $scope.getAllMembers = function(){
    Home.getAllMembers()
        .then(function(data){
          $scope.allMembers = data;
        }).catch(function(err){
          throw err;
        });
  };

  /*******************************************
   * Load one Member Profile from Factory
   ******************************************/

  $scope.getMember = function(){
    Home.getMember(selectedPerson[id])
        .then(function(data){
          $scope.member = data;
        }).catch(function(err){
          throw err;
        });        
  };

  /*******************************************
   * Load votes for the member from Factory,
   * add to member object
   ******************************************/

  $scope.getMemberVotes = function(){
    Home.getMemberVotes(selectedPerson[id])
        .then(function(data){
          $scope.member.votes = data;
        }).catch(function(err){
          throw err;
        });
  };

  /*******************************************
   * Load Bill details from Factory
   ******************************************/

  $scope.getBillDetails = function(){
    for (var bill_id in $scope.member.votes){
      Home.getBillDetails(bill_id)
          .then(function(data){
            if (!(bill_id in $scope.billDetails)){
              $scope.billDetails[bill_id] = data;
            }
          }).catch(function(err){
            throw err;
          });
    }
  };

  /*******************************************
   * Load all members upon controller load
   ******************************************/
  $scope.getAllMembers();

};
