
module.exports = function homeFactory($http){

  var allMembers = [];
  var trendingMembers;
  // getAllMembers();

  /*******************************************
   * Loads All Members Name and ID from server
   ******************************************/
  
  function getAllMembers(scope){
    return $http({
      method: 'GET',
      url: '/members/all',
    })
    .then(function(res){
      for (var id in res.data.memberList){
        allMembers.push(res.data.memberList[id]);
      }
      scope.allMembers = allMembers;
      trendingMembers = res.data.trendingList;
      scope.trendingMembers = res.data.trendingList;
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
      url: '/bills/'+id,
    })
    .then(function(res){
      return res.data;
    });
  }

  /*******************************************
   * Expose factory functions to the controller
   ******************************************/

  return({
    allMembers: allMembers,
    trendingMembers: trendingMembers,
    getAllMembers: getAllMembers,
    getMember: getMember,
    getMemberVotes: getMemberVotes,
    getBillDetails: getBillDetails 
  });

};
