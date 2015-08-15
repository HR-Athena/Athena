/*global angular, describe, it, beforeEach, inject */
"use strict";

// var Promise = require('bluebird');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

// var angular = require("angular");
// require("angular-mocks");

require('angular-mocks/angular-mocks');

describe("Profile controller", function() {
  // getting access to the controller and its scope
  var scope, ctrl;
  // creating mocks for controller dependencies
  var $stateParams = {
    id: 1
  };
  // Home.getMember is an asynchronous function;
  // therefore mock has to return a promise
  var Home = {
    getMember: function(id){
      return Promise.resolve({
          "id":300065,
          "firstname":"Patrick",
          "lastname":"Leahy",
          "fullname":"Sen. Patrick Leahy [D-VT]",
          "description":"Senior Senator from Vermont",
          "party":"Democrat",
          "role":"senator",
          "birthday":"1940-03-31",
          "enddate":"2017-01-03",
          "twitterid":"SenatorLeahy",
          "youtubeid":"SenatorPatrickLeahy",
          "website":"http://www.leahy.senate.gov",
          "phone":"202-224-4242"
      });
    } 
  };


  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('congressmanprofile');

    angular.mock.inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('profileController', {
        $scope: scope,
        $stateParams: $stateParams,
        Home: Home
      });
    });

  });


  it("assigns a congressman object to $scope.member", function(){
    // using chai-as-promised, because Home.getMember() is an asynchronous function
    expect(Home.getMember()).to.eventually.eql(scope.member);
  });


  describe("loadMember function", function() {

    // loadMember will call getMember(), which is not attached to the scope,
    // so can't test it directly, but the $scope should change as a result

    it("by calling 'getMember' eventually calls Home.getMember and passes id from the addMember object to it", function(){
      sinon.spy(Home, 'getMember');
      scope.addMember = {id: 1};
      scope.$digest();
      scope.loadMember();
      expect(Home.getMember).to.have.been.calledWith(1);
      Home.getMember.restore(); // remove spy
    });

    it("cleans the $scope.addMember model", function(){
      scope.addMember = {id: 1};
      scope.$digest();
      scope.loadMember();
      expect(scope.addMember).to.equal(null);
    });

  });


  describe("removePolitician function", function() {
    
    it("removes the second congressman’s id", function(){
      scope.secondMember = {data: {id: 1}};
      scope.$digest();
      scope.removePolitician();
      expect(scope.secondMember.data.id).to.equal(null);
    });    

  });


});
