// Profile Controller
var app = angular.module('congressmanprofile', [])

app.controller ('profileController', function($scope, name){
  
  $scope.profile = {};

  $scope.getMember = function(id){

  }


  $scope.getMemberVotes = function(id) {

  }

});


/*****************************************************
 * Bill Controller - (move to sep file)
 ****************************************************/
app.controller ('billController', function($scope){
  
  $scope.bill = {

  }

  $scope.getBillInformation = function(id){

  }


});
