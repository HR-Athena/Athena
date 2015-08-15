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
        data: {"memberList":
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
              }
      });

      // mock data for request to '/members/:id'
      $httpBackend.when('GET', '/members/1').respond({
        data: {
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
          "phone":"202-224-6665"}
      });

    });

  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe("Some angular controller test", function() {
    
    it("should ", function(){
      expect(1 + 1).to.equal(2);
    });

  });

});
