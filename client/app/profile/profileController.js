// Profile Controller

module.exports = function profileController($scope, $stateParams, Home){

  console.log('I am profile controller');
  
  var selectedPerson = {};
  

  $scope.memberId=$stateParams.id;

  $scope.allMembers = {}; // app.allMembers; // TODO: Check if OK
  $scope.member = {}; 
  
  getMember($scope.memberId);
  getMemberVotes($scope.memberId);


  //$scope.member2 = {};

 /*******************************************
   * When user adds a second profile
   ******************************************/

   $scope.selectPerson = function(newPerson){
    selectedPerson = newPerson;
  };

 /*******************************************
   * Load one Member Profile from Factory
   ******************************************/

   function getMember(id){
    Home.getMember(id)
    .then(function(data){
      $scope.member = data;
      $scope.member.age=calculateAge(new Date($scope.member.birthday));

    }).catch(function(err){
      throw err;
    });        
  }

   /*******************************************
   * Load votes for the member from Factory,
   * add to member object
   ******************************************/

   function getMemberVotes(id){
    Home.getMemberVotes(id)
    .then(function(data){
      $scope.member.votes = data;
    }).catch(function(err){
      throw err;
    });
  }


  function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
};


