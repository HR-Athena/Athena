// Profile Controller

var angular = require('angular');
var app = angular.module('congressmanprofile');

app.controller ('profileController',['$scope','Home' , function($scope, Home){
  
  var selectedPerson = {};

  $scope.allMembers = app.allMembers; // TODO: Check if OK
  $scope.member1 = app.member; // TODO: Check if OK
  $scope.member2 = {};

 /*******************************************
   * When user adds a second profile
   ******************************************/

  $scope.selectPerson = function(newPerson){
    selectedPerson = newPerson;
  };

 /*******************************************
   * Load one Member Profile from Factory
   ******************************************/

  $scope.getMember = function(){
    Home.getMember(selectedPerson[id])
        .then(function(data){
          $scope.member2 = data;
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

}]);
