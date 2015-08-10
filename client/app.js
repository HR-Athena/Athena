var angular = require('angular');
require('angular-ui-router');
var home = require('./app/home');

// test

/*Entry Point for routing*/
var congressmanprofile = angular.module('congressmanprofile', [
  // add in controller dep
  //ex congressmanprofile.home
  'ui.router',
  home.name
  ])
// Router for app
.config(function($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      // template: "Hello world",
      templateUrl: 'views/home/home.html',
      controller: 'homeController'
    });
    // .state('profile', {
    //   url: '/profile',
    //   template: "this is profile view",
    //   // templateUrl: '/public/views/profile.html',
    //   controller: require('./app/profile/profileController')
    // });

});
