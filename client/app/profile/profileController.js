// Profile Controller

var d3 = require('d3');

module.exports = function profileController($scope, $stateParams, Home){

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
      // memberName = member.data.firstname + " " + member.data.lastname;
      loadGraph(id, member.data.fullname);
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
      // if ($scope.test===1){
      //   getCommonVotes ();
      // }
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
    // $scope.test = 1;
    getMember(memberId2, $scope.secondMember);
    // Clear Member from Input
    $scope.addMember = null;
   };


  // function getCommonVotes (){
  //   var id1 = [];
  //   var id2 = [];
  //   var commonId = [];
  //   var cVotes = [];


  //   for (var i=0; i<$scope.member.data.votes.length; i++){
  //     id1.push($scope.member.data.votes[i].id);
  //   }

  //   for (var j=0; j<$scope.secondMember.data.votes.length; j++){
  //     id2.push($scope.secondMember.data.votes[j].id);
  //   }

  //   var max = id1.length >= id2.length ? id2.length : id1.length;

  //   for (var k=0; k<max; k++){
  //     if (id2.indexOf(id1[k]) > -1){
  //       commonId.push(id1[k]);
  //     }
  //   }

  //   for (var m=0; m<commonId.length; m++){
  //     var vote1 = getVoteInfo(commonId[m], $scope.member);
  //     var vote2 = getVoteInfo(commonId[m], $scope.secondMember);

  //     var tempObj = {
  //       id: vote1.id,
  //       bill_question: vote1.bill_question,
  //       bill_question_details: vote1.bill_question_details,
  //       result: vote1.result,
  //       memberVote: vote1.vote,
  //       secondMemberVote: vote2.vote
  //     };

  //     cVotes.push(tempObj);
  //   }
  //   $scope.commonVotes = cVotes;
  //   console.log($scope.commonVotes);
  // }

  // function getVoteInfo (voteId, member){
  //   for (var i=0; i<member.data.votes; i++){
  //     if (member.data.votes[i].id===voteId){
  //       return member.data.votes[i];
  //     }
  //   }
  // }


  /*******************************************
   * Plot Historical Votes on Graph
   ******************************************/
   function loadGraph(memberId, memberName){
      var url = 'https://www.govtrack.us/api/v2/vote_voter/?person=' + memberId + '&limit=1000&order_by=+created&format=json&fields=created,option__value,vote__category,vote__chamber,vote__question,vote__number,vote__percent_plus,vote__link,vote__related_bill';
     
      //Load Data
      d3.json(url, function (error, data) {
       
        data = data.objects;

        //Parse date / time
        var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S").parse;

        //Pretty Dat Format
        var prettyDate = d3.time.format("%B %d, %Y");
       
        //Parse Date and coerce numbers
        data.forEach(function(d){
          d.created = parseDate(d.created);
          d.vote.percent_plus = +d.vote.percent_plus;
        });

        var margin = {top: 20, right: 20, bottom: 60, left: 40},
            padding = {top: 40, right: 30, bottom: 50, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var xScale = d3.time.scale().range([0, width]).domain(d3.extent(data, function (d) { return d.created; }));
        var xValue = function(d) { return d.created; };
        var xMap = function(d) { return xScale(xValue(d)); };
        var xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(d3.time.format('%b \'%y'));

        var yScale = d3.scale.linear().range([height, 0]).domain([0, 100]);
        var yValue = function(d) { return d.vote.percent_plus * 100; };
        var yMap = function(d) { return yScale(yValue(d)); };
        var yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(3);    

        var zoom = d3.behavior.zoom()
            .x(xScale)
            .y(yScale)
            .scaleExtent([1, 10])
            .on("zoom", zoomed);

        var vis = d3.select(".graph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
            .call(zoom);
            
        vis.append("rect")
            .attr("width", width)
            .attr("height", height);

        var svg = vis.append("svg")
         .attr('top', 0)
         .attr('left', 0)
         .attr('width', width)
         .attr('height', height)
         .attr('viewBox',  "0 0 " + width + " " + height);

        // Add x-axis and Label
        vis.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .append('text')
            .attr('class', 'label')
            .attr('x', (width - padding.left) / 2)
            .attr('y', 32)
            .style('text-anchor', 'bottom')
            .text('Date of Vote');

        // Add y-axis and Label
        vis.append("g")
            .attr("class", "y axis")
            .call(yAxis)
           .append('text')
             .attr('class', 'label')
             .attr('transform', 'rotate(-90)')
             .attr('x', -(height / 1.5) )
             .attr('y', -30)
             .style('text-anchor', 'bottom')
             .text('% of Members In Favor of Bill');

        // Add politician name
        vis.append("text")
          .attr('class', 'axis')
          .attr('x', (width - padding.left - 50) / 2)
          .attr('dy', "-.75em")
          .text(memberName);
            
        //Setup Fill Color based on Vote value
        var color = function(value) {
          if (value === 'Yea' || value === 'Aye') {
            //set color to green and return
            return '#7bc043';
          } else if (value === 'Nay' || value === 'No') {
            //set color to red and return
            return '#ee4035';
          } else {
            //set color to gray and return
            return '#aaaaaa';
          }
        };

        //Add Tooltip
        var tooltip = d3.select('body').append('div')
         .attr('class', 'tooltip')
         .style('opacity', 0);

        //draw votes
        svg.selectAll('circle')
         .data(data)
        .enter().append('circle')
         .attr('class', 'vote')
         .attr('r', 3.5)
         .attr('cx', xMap)
         .attr('cy', yMap)
         .style('fill', function (d) { return color(d.option.value); })
         .on('click', function (d, i) { window.open( d.vote.link, '_blank'); })
         .on('mouseover', function (d) {
           tooltip.transition()
             .duration(500)
             .style('opacity', '.95');
           tooltip.html('<dl><dt>Topic: </dt><dd>' + d.vote.question + '</dd><dt>Vote/Category: </dt><dd>' + d.option.value +" / "+ d.vote.category + '</dd><dt>Date: </dt><dd>' + prettyDate(d.created) + '</dd></dl>')
             .style('left', (d3.event.pageX + 15) + 'px')
             .style('top', (d3.event.pageY + 15) + 'px')
             .style('padding', "5px")
             .style('border-radius', '10px')
             .style('background', '#FEFEFE' );
         })
         .on('mouseout', function (d){
           tooltip.transition()
             .duration(500)
             .style('opacity', 0);
         });

        // Controls Zoom and circle resizing
        function zoomed() {
          vis.select(".x.axis").call(xAxis);
          vis.select(".y.axis").call(yAxis);
          svg.selectAll('circle')
           .attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
           .attr('r', 3.5 / d3.event.scale );
        }
     });
   }
};


