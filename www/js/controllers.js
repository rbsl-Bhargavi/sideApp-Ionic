angular.module('starter.controllers', [])

.controller('AppCtrl', function( $ionicModal,$scope, $cordovaFacebook, $ionicLoading, $ionicHistory, $state,$timeout,$ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
   

    $scope.profileDiv = false;
    $scope.logoutDiv = false;
    $scope.loginDiv = true;
 //fb login
   $scope.fbLogin = function(){     

    $cordovaFacebook.login(["public_profile", "email", "user_friends"])
    .then(function(success) {
      /*
       * Get user data here. 
       * For more, explore the graph api explorer here: https://developers.facebook.com/tools/explorer/
       * "me" refers to the user who logged in. Dont confuse it as some hardcoded string variable. 
       * 
      */
      //To know more available fields go to https://developers.facebook.com/tools/explorer/
      $cordovaFacebook.api("me?fields=id,name,picture", [])
      .then(function(result){
        /*
         * As an example, we are fetching the user id, user name, and the users profile picture
         * and assiging it to an object and then we are logging the response.
        */
        var userData = {
          id: result.id,
          name: result.name,
          pic: result.picture.data.url
        }
        //Do what you wish to do with user data. Here we are just displaying it in the view
        $scope.fbData = JSON.stringify(userData, null, 4);
	       // alert($scope.fbData);
         $state.go('app.profile');

           $scope.profileDiv = true;
          $scope.loginDiv = false;
          $scope.logoutDiv = true;

      }, function(error){
        // Error message
      })
      
    }, function (error) {
      // Facebook returns error message due to which login was cancelled.
      // Depending on your platform show the message inside the appropriate UI widget
      // For example, show the error message inside a toast notification on Android
    });

  }

  $scope.fbLogout = function(){

     var confirmPopup = $ionicPopup.confirm({
     title: 'Logout',
     template: 'Are you sure you want to Logout?'
      });
      confirmPopup.then(function(res) {
      if(res) {
          $cordovaFacebook.logout({

         });
         $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
        });


         $timeout(function () {
          $ionicLoading.hide();
          $scope.loginDiv = true;
           $scope.logoutDiv = false;
          }, 2000);

        $scope.profileDiv = false;
        $state.go('app.home');

     } else {
       
     }
   });

    }

})

.controller('PlaylistsCtrl', function($scope) {

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('profileCtrl',function($scope,$stateParams){
   
})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate,$ionicViewService) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $ionicViewService.nextViewOptions({disableBack: true});
    $state.go('app.home');
     window.localStorage.didTutorial = 'true';
    
  };

  if (window.localStorage.didTutorial === 'true') {
    $scope.startApp();

  } else {
    $state.go('app.intro');
  }




  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
});



