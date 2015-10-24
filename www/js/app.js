// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


   if (window.plugins && window.plugins.webintent) {
        window.plugins.webintent.getExtra(window.plugins.webintent.EXTRA_TEXT,
          function(url) { 
            alert(url);
            //var postUrl = "http://26.kappa.readybytes.in/tmp/test.php?appUrl="+url;
            

              $.post(
                   "http://26.kappa.readybytes.in/tmp/test.php",
                   {appUrl:url},
                   function(data) {
                   alert("Response: " + data);
                    }
                   );
           }, function() {
              //alert('Url not found');
              }
        );
      }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      }
    })
  .state('app.intro', {
      url: '/intro',
      views: {
        'menuContent': {
          templateUrl: 'templates/intro.html',
          controller:'IntroCtrl'
      }

        
      }
    })
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
		  controller: 'profileCtrl'
        }
      }
    })
 
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/app/intro');


})

/*.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(5);

  // note that you can also chain configs
  //$ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
})*/

/*.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
});*/
