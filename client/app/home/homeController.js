//Home Controller

var app = angular.module('congressmanprofile', []);

app.controller ('homeController',['$scope','Home' , function($scope, name, Home){
  
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

}])
.factory('Home',['$http', function($http){

  /*******************************************
   * Loads All Members Name and ID from server
   ******************************************/
  
  function getAllMembers(){
    return $http({
      method: 'GET',
      url: '/members/all',
    })
    .then(function(res){
      return res.data;
    });
  }

  /*******************************************
   * Load one Member Profile from server
   ******************************************/

  function getMember(id){
    return $http({
      method: 'GET',
      url: '/members/'+id,
    })
    .then(function(res){
      return res.data;
    });
  }

  /*******************************************
   * Load Member's Vote from server
   ******************************************/

  function getMemberVotes(id){
    return $http({
      method: 'GET',
      url: '/votes/'+id,
    })
    .then(function(res){
      return res.data;
    });
  }

   /*******************************************
   * Load Bill Details from server
   ******************************************/

  function getBillDetails(id){
    return $http({
      method: 'GET',
      url: '/bill/'+id,
    })
    .then(function(res){
      return res.data;
    });
  }

  /*******************************************
   * Expose factory functions to the controller
   ******************************************/

  return({ 
    getAllMembers: getAllMembers,
    getMember: getMember,
    getMemberVotes: getMemberVotes,
    getBillDetails: getBillDetails 
  });

}]);

