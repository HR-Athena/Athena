module.exports = function barController($scope, $stateParams, Home) {
  $scope.id = undefined;
  $scope.index = 0;
  $scope.votes = {};
  $scope.labels = ['Yea', 'Nay', 'No Vote'];
  $scope.series = ['Democrat', 'Independent', 'Republican'];

  $scope.data = [[],[],[]];

  $scope.getBillVotes = function(id){
    if (id === undefined){
      $scope.id = $stateParams.id;
      id = $scope.id;
    }
    Home.getBillVotes(id)
    .then(function(res){
      console.log(res);
      if(res) {
        $scope.votes = res;
        $scope.changeIndex(0);
      }
    }).catch(function(err){
      throw "Error in getBillVotes:" + err;
    });
  };

  $scope.changeIndex = function(index){
    $scope.index = index;
    var data = $scope.votes[index];
    $scope.data[0] = data.democrat;
    $scope.data[1] = data.independent;
    $scope.data[2] = data.republican;
  };

  $scope.getBillVotes($scope.id);
};