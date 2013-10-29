function init() {
  window.init();
}
//var apiRoot = 'https://8enmann.appspot.com/_ah/api';
var apiRoot = 'http://localhost:8888/_ah/api';
var app = angular.module('angularjs-starter', []);
var SCOPES = ['https://www.googleapis.com/auth/userinfo.email'];
var CLIENT_ID = '465918363.apps.googleusercontent.com';

app.controller('MainCtrl', function($scope, $window, $location) {

  $scope.auth = function() {
    signin(false, $scope.userAuthed);
  };
  $scope.unauth = function() {
    gapi.auth.setToken(null);
    $scope.is_backend_ready = undefined;
  };

  $scope.load_guestbook_lib = function() {
    var apisToLoad;
    var callback = function() {
      if (--apisToLoad == 0) {
        signin(true, $scope.userAuthed);
      }
    }

    apisToLoad = 2; // must match number of calls to gapi.client.load()
    gapi.client.load('guestbook', 'v1', callback, apiRoot);
    gapi.client.load('oauth2', 'v2', callback);
  };

  $scope.userAuthed = function() {
    console.log('auth done');
    $scope.is_backend_ready = true;
    $scope.list();
  }

  $window.init = function() {
    console.log('called init');
    $scope.$apply($scope.load_guestbook_lib);
  };

  $scope.insert = function() {
    message = {
      "content" : $scope.content
    };

    gapi.client.guestbook.messages.insert(message).execute(function(resp) {
      $scope.messages.push(resp);
      $scope.$apply();
      $scope.list();
    });
  };

  $scope.list = function() {
    console.log('listing');
    var payload = {limit: 10};
    if ($scope.nextPageToken) {
      payload.pageToken = $scope.nextPageToken;
    }
    gapi.client.guestbook.messages.list(payload).execute(function(resp) {
      console.log(resp);
      $scope.messages = resp.items;
      $scope.$apply();
      $scope.nextPageToken = resp.nextPageToken;
    });
  };
});

function signin(mode, callback) {
  console.log('authorizing');
  gapi.auth.authorize({client_id: CLIENT_ID,
    scope: SCOPES, immediate: mode},
    callback);
}
