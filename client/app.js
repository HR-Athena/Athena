var angular = require('angular');
require('angular-ui-router');
var home = require('./app/home');
var profile = require('./app/profile');

// test

/*Entry Point for routing*/
var congressmanprofile = angular.module('congressmanprofile', [
  // add in controller dep
  //ex congressmanprofile.home
  'ui.router',
  home.name,
  profile.name
  ])
// Router for app
.config(function($locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html',
      controller: 'homeController'
    })
    .state('profile', {
      url: '/profile',
      // template: "this is profile view",
      templateUrl: 'views/profile/profile.html',
      controller: 'profileController'
    });

});
