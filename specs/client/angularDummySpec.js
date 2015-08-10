/*global angular, describe, it, beforeEach, inject */
"use strict";

var chai = require('chai');
var expect = chai.expect;

// var angular = require("angular");
// require("angular-mocks");

require('angular-mocks/angular-mocks');

describe("some angular controller's test", function() {
  var scope, ctrl;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('congressmanprofile');

    angular.mock.inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('homeController', { $scope: scope});
    });

  });

  describe("Some angular controller test", function() {
    
    it("works", function(){
      expect(1 + 1).to.equal(2);
    });

  });

});
