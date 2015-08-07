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

var memberList = {};
var memberProfile = {};
var memberVotes = {};

// this expression retrieves a list of current members, and writes it into the memberList object
members.getAllMembers(function(objects){
  objects.forEach(function(listing){
    var id = listing.person.id;
    memberList[id] = utils.makeMemberEntry(listing);
  });
  // console.log(memberList);
});

// this pulls a specific member and populates the memberProfile object with their info
members.getMember(412669, function(listing){
  memberProfile = utils.makeMemberProfile(listing);
  // console.log(memberProfile);
});


module.exports = app;
