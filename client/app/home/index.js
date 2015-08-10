var angular = require("angular");

var homeController = require("./homeController");
var Home = require('./homeFactory.js');

module.exports = angular.module("congressmanprofile.home", [])
  .controller('homeController', homeController)
  .factory('Home', Home);

