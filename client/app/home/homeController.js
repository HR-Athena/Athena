//Home Controller

var Home = require('./homeFactory.js');

module.exports = function homeController($scope, $state, Home){

  $scope.member = {};
  Home.getAllMembers($scope);

  $scope.gotoMember = function(){
    var id = $scope.memberSearch.id;
    $state.go('profile', {id:id});
  };

};
