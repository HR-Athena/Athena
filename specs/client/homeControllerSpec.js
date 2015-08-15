/*global angular, describe, it, beforeEach, inject */
"use strict";

var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

// var angular = require("angular");
// require("angular-mocks");

require('angular-mocks/angular-mocks');

describe("Home controller", function() {
  // getting access to the controller and its scope
  var scope, ctrl;
  // creating mocks for controller dependencies
  var $state = {
    go: function(to, params){
      return true;
    }
  };
  var Home = {
    allMembers: {},
    trendingMembers: {}
  };


  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('congressmanprofile');

    angular.mock.inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('homeController', { 
        $scope: scope,
        $state: $state,
        Home: Home
      });
    });

  });

  describe("gotoMember function", function() {

    sinon.spy($state, 'go');

    it("calls $state.go", function(){
      scope.memberSearch = {id: 1};
      scope.$digest();
      scope.gotoMember();
      expect($state.go).to.have.been.calledOnce;
    });

    it("redirects to the 'profile' state and passes the correct id", function(){
      scope.memberSearch = {id: 1};
      scope.$digest();
      scope.gotoMember();
      expect($state.go).to.have.been.calledWith('profile', {id: 1});
    });

  });

});
