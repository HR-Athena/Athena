// Profile Controller

module.exports = function profileController($scope, $stateParams, Home){

  console.log('I am profile controller');

  var memberId1=$stateParams.id;

  $scope.allMembers = Home.allMembers;
  $scope.member = {};
  $scope.secondMember = {};
  $scope.commonVotes = [];
  $scope.test=0;
  
  getMember(memberId1, $scope.member);
 
 /* member.data.votes = [{id: 221}, {id: 323}, {id: 566}...]
    secondMember.data.votes = [{id: 566}, {id: 545}, {id: 544}...]
 */

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
      if ($scope.test===1){
        getCommonVotes ();
      }
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
    $scope.test = 1;
    getMember(memberId2, $scope.secondMember);    
   };

  function getCommonVotes (){
    var id1 = [];
    var id2 = [];
    var commonId = [];
    var cVotes = [];


    for (var i=0; i<$scope.member.data.votes.length; i++){
      id1.push($scope.member.data.votes[i].id);
    }

    for (var j=0; j<$scope.secondMember.data.votes.length; j++){
      id2.push($scope.secondMember.data.votes[j].id);
    }

    var max = id1.length >= id2.length ? id2.length : id1.length;

    for (var k=0; k<max; k++){
      if (id2.indexOf(id1[k]) > -1){
        commonId.push(id1[k]);
      }
    }

    for (var m=0; m<commonId.length; m++){
      var vote1 = getVoteInfo(commonId[m], $scope.member);
      var vote2 = getVoteInfo(commonId[m], $scope.secondMember);

      var tempObj = {
        id: vote1.id,
        bill_question: vote1.bill_question,
        bill_question_details: vote1.bill_question_details,
        result: vote1.result,
        memberVote: vote1.vote,
        secondMemberVote: vote2.vote
      };

      cVotes.push(tempObj);
    }
    $scope.commonVotes = cVotes;
    console.log($scope.commonVotes);
  }

  function getVoteInfo (voteId, member){
    for (var i=0; i<member.data.votes; i++){
      if (member.data.votes[i].id===voteId){
        return member.data.votes[i];
      }
    }
  }


};


