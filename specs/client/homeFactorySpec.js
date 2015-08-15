/*global angular, describe, it, beforeEach, afterEach, inject */
"use strict";

var chai = require('chai');
var expect = chai.expect;

require('angular-mocks/angular-mocks');

describe("home factory", function() {
  
  var Home;
  var $httpBackend;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('congressmanprofile');

    angular.mock.inject(function($injector) {
      Home =  $injector.get('Home');
      $httpBackend = $injector.get('$httpBackend');

      // mock data for request to '/members/all'
      $httpBackend.when('GET', '/members/all').respond({
        "memberList":
        {"300002": {
          "id":300002,
          "firstName":"Lamar",
          "lastName":"Alexander",
          "title":"Sen. Lamar Alexander [R-TN]",
          "role":"senator"
        },
         "300008":{
           "id":300008,
           "firstName":"Joseph",
           "lastName":"Biden",
           "title":"Vice President Joseph Biden [D]",
           "role":"vicepresident"
         }},
        "trendingList": [
          {
            "id":300025,
            "firstName":"Susan",
            "lastName":"Collins",
            "title":"Sen. Susan Collins [R-ME]",
            "role":"senator"
          },{
            "id":300065,
            "firstName":"Patrick",
            "lastName":"Leahy",
            "title":"Sen. Patrick Leahy [D-VT]",
            "role":"senator"}
        ]
      });

      // mock data for request to '/members/:id'
      $httpBackend.when('GET', '/members/1').respond(
        {
          "id":300075,
          "firstname":"Lisa",
          "lastname":"Murkowski",
          "fullname":"Sen. Lisa Murkowski [R-AK]",
          "description":"Senior Senator from Alaska",
          "party":"Republican",
          "role":"senator",
          "birthday":"1957-05-22",
          "enddate":"2017-01-03",
          "twitterid":"LisaMurkowski",
          "youtubeid":"senatormurkowski",
          "website":"http://www.murkowski.senate.gov",
          "phone":"202-224-6665"
      });

    });

  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


    
  it("should make a request to get all congressmen", function(){
    $httpBackend.expectGET('/members/all');
    // since expectation on the previous line was set after the factory was called,
    // need to execute getAllMembers again
    Home.getAllMembers(); 
    $httpBackend.flush();
  });


  it("should create an array of all congressmen", function(){
    // since the before each block will have run by this point,
    // there's no need to call Home.getAllMembers
    $httpBackend.flush();
    expect(Home.allMembers).to.eql(
      [{
        "id":300002,
        "firstName":"Lamar",
        "lastName":"Alexander",
        "title":"Sen. Lamar Alexander [R-TN]",
        "role":"senator"
      },
       {
         "id":300008,
         "firstName":"Joseph",
         "lastName":"Biden",
         "title":"Vice President Joseph Biden [D]",
         "role":"vicepresident"
       }]
    );
  });


  it("should create an array of 'trending members", function(){
    // since the before each block will have run by this point,
    // there's no need to call Home.getAllMembers
    $httpBackend.flush();
    expect(Home.trendingMembers).to.eql(
      [
        {
          "id":300025,
          "firstName":"Susan",
          "lastName":"Collins",
          "title":"Sen. Susan Collins [R-ME]",
          "role":"senator"
        },{
          "id":300065,
          "firstName":"Patrick",
          "lastName":"Leahy",
          "title":"Sen. Patrick Leahy [D-VT]",
          "role":"senator"}
      ]
    );
  });


  it("should make a request to get info about a single congressman", function(){
    $httpBackend.expectGET('/members/1');
    Home.getMember(1);
    $httpBackend.flush();
  });

});
