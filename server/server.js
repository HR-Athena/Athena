var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var govTrack = require('govtrack-node');
var members = require('./memberController');
var utils = require('./utilController');
var Promise = require('bluebird');



var app = express();

app.use(express.static(__dirname + "/../client"));
app.use(favicon(__dirname + '/../client/favicon.ico'));

/*
  Need to handle a GET request to '/allmembers' by responding back with memberList
*/

var memberList = {};
var memberProfile = {};
var memberVotes = {};

setTimeout(function(){console.log(memberVotes)}, 4000);


// this expression retrieves a list of current members, and writes it into the memberList object, like:
/*
  { id1: {memberEntry},
    id2: {memberEntry},
    id3: {memberEntry},
    id4: {memberEntry},
    id5: {memberEntry}, ...
  } 
*/
members.getAllMembers(function(objects){
  objects.forEach(function(listing){
    var id = listing.person.id;
    memberList[id] = utils.makeMemberEntry(listing);
  });
});


// this pulls a specific member and populates the memberProfile object like: 
/*  { 
      id: 412669,
      name: 'Sen. Mike Rounds [R-SD]',
      description: 'Junior Senator from South Dakota',
      party: 'Republican',
      birthday: '1954-10-24',
      enddate: '2021-01-03',
      twitterid: 'SenatorRounds',
      youtubeid: null,
      website: 'http://www.rounds.senate.gov',
      phone: '202-224-5842' 
    }
*/
members.getMember(412669, function(listing){
  memberProfile = utils.makeMemberProfile(listing);
});


// this expression retrieves the voting record for a member, and writes it into the memberVotes object
/*  { 
      bill_id1: 'voteResult', (bill_id is a number, voteResult is a string of 'Yea', 'Nay', or 'Not Voting')
      bill_id2: 'voteResult', (maybe other voteResults are possible but I haven't seen them)
      bill_id3: 'voteResult',
      bill_id4: 'voteResult', ...
    }
*/
members.getMemberVotes(412669, function(objects){
  objects.forEach(function(listing){
    var bill_id = listing.vote.id;
    memberVotes[bill_id] = listing.option.value;
  });
});

module.exports = app;
