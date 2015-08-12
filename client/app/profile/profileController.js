// Profile Controller

module.exports = function profileController($scope, $stateParams, Home){

  console.log('I am profile controller');

  var memberId1=$stateParams.id;

  $scope.allMembers = Home.allMembers;
  $scope.member = {};
  $scope.secondMember = {}; 
  
  getMember(memberId1, $scope.member);
 

 /*******************************************
   * Load one Member Profile from Factory
   ******************************************/

   function getMember(id, member){
    Home.getMember(id)
    .then(function(data){      
      member.data = data;
      member.data.age=calculateAge(new Date(member.data.birthday));
      return member;
    }).then(function(member){
      getMemberVotes(member);
    }).catch(function(err){
      throw err;
    });        
  }

   /*******************************************
   * Load votes for the member from Factory,
   * add to member object
   ******************************************/

   function getMemberVotes(member){
    Home.getMemberVotes(member.data.id)
    .then(function(votes){
      member.data.votes = votes;
    }).catch(function(err){
      throw err;
    });
  }


  function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  /*******************************************
   * Load Second Member Profile from Factory
   ******************************************/
   $scope.loadMember = function (){
    var memberId2 = $scope.addMember.id;
    getMember(memberId2, $scope.secondMember);
   };

};


