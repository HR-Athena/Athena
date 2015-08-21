var angular = require("angular");

var billController = require("./billController.js");
var Home = require('../home/homeFactory.js');

module.exports = angular.module("congressmanprofile.profile", [])
  .controller('billController', billController)
  .factory('Home', Home);