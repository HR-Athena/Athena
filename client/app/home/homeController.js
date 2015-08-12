//Home Controller
// var angular = require('angular');
// var app = angular.module('congressmanprofile');

var Home = require('./homeFactory.js');

module.exports = function homeController($scope, $state, Home){

  $scope.member = {};
  $scope.allMembers = Home.allMembers;
 
  $scope.trendingMembers = [];

  $scope.gotoMember = function(){
    var id = $scope.memberSearch.id;
    $state.go('profile', {id:id});
  };

};
