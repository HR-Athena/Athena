// Profile Controller

module.exports = function profileController($scope, $stateParams, Home){

  console.log('I am profile controller');
  
  var selectedPerson = {};

  $scope.memberId=$stateParams.id;
  $scope.billDetails = {};



  $scope.allMembers = {}; // app.allMembers; // TODO: Check if OK
  $scope.member = {}; // app.member; // TODO: Check if OK
  
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
       console.log($scope.member);
      getBillDetails(3);
    }).catch(function(err){
      throw err;
    });
  }

  function getBillDetails(max){
    var count = 0;
    var voteIds = Object.keys($scope.member.votes);
    
    // voteIds.forEach(function (id){

    // });

    for (var bill_id in $scope.member.votes){
      //console.log("bill_id:"+bill_id);
      if (count < max){
        Home.getBillDetails(bill_id) 
        .then(function(data){
          // console.log("******", data);
          // console.log("again_bill_id:"+bill_id);
          if (!(bill_id in $scope.billDetails)){
            $scope.billDetails[bill_id] = data;
            //console.log("=====", $scope.billDetails);
          }
        }).catch(function(err){
          throw err;
        });
        count++;
      }
    }
  }

};

