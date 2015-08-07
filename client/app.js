/*Entry Point for routing*/
var congressmanprofile = angular.module('congressmanprofile', [
  // add in controller dep
  //ex congressmanprofile.home
  'ui-router'
  ])

// Router for app
.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/home/home.html',
    controller: 'homeController'
  })
  .when('/profile', {
    templateUrl: 'app/profile/profile.html',
    controller: 'profileController'
  });

});

