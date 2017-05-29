'use strict';

/**
 * @ngdoc service
 * @name piluApp.storiesService
 * @description
 * # storiesService
 * Service in the piluApp.
 */
angular.module('piluApp')
  .service('storiesService', ['appConfig', '$http', '$window', function (appConfig, $http, $window) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
      getPublicStories: function (data, success, error) {
        return $http({
          method: 'GET',
          url: appConfig.apiUrl + '/stories/public',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(function(response) {
          return response.data;
        }, function(error) {
          console.log('Error: ', error)
        });
      },

      getUserStories: function (userID) {
        return $http({
          method: 'POST',
          url: appConfig.apiUrl + '/stories/mystories',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: $.param({
            userID: userID
          })
        })
        .then(function(response) {
          return response.data;
        }, function(error) {
          console.log('Error: ', error)
        });
      },

      addNewStory: function (data, success, error) {
        $http({
          method: 'POST',
          url: appConfig.apiUrl + '/stories/new',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: $.param({
            userID: data.userID,
            imageUrl: data.imageUrl,
            description: data.description,
            location: data.location,
            public: data.public
          })
        })
        .then(function successCallback(response) {
          console.log('New Story Successfully Posted: ', response.data);
        }, function errorCallback(error) {
          console.log('Error: ', error)
        });
      },

      updateAStory: function (currentStory) {
        $http({
          method: 'POST',
          url: appConfig.apiUrl + '/stories/update',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: $.param({
            storyID: currentStory._id,
            description: currentStory.description,
            location: currentStory.location
          })
        })
        .then(function successCallback(response) {
          console.log('New Story Successfully Updated: ', response.data);
        }, function errorCallback(error) {
          console.log('Error: ', error)
        });
      },

      deleteAStory: function (storyID) {
        $http({
          method: 'DELETE',
          url: appConfig.apiUrl + '/stories/delete',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: $.param({
            storyID: storyID
          })
        })
        .then(function successCallback(response) {
          console.log('New Story Successfully Deleted: ', response.data);
        }, function errorCallback(error) {
          console.log('Error: ', error)
        });
      },

      addNewComment: function (data, success, error) {
        $http({
          method: 'POST',
          url: appConfig.apiUrl + '/comments/new',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: $.param({
            userID: data.userID,
            storyID: data.storyID,
            commentText: data.commentText
          })
        })
        .then(function successCallback(response) {
          console.log('New Comment Successfully Posted: ', response.data);
        }, function errorCallback(error) {
          console.log('Error: ', error)
        });
      },
    };
  }]);
