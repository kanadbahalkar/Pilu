'use strict';

/**
 * @ngdoc function
 * @name piluApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the piluApp
 */

angular.module('piluApp')
  .controller('FeedCtrl', [
    'appConfig',
    '$http',
    '$scope',
    '$location',
    '$log',
    '$window',
    '$routeParams',
    'storiesService',
    '$mdDialog',
    'Upload',
    '$timeout',
    function (appConfig, $http, $scope, $location, $log, $window, $routeParams, storiesService, $mdDialog, Upload, $timeout) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      ////////Hardcoded userid for demo purposes
      $scope.userID = '592b89d7b63f92043e00835b';
      //Get all stories of a user 
      storiesService.getUserStories($scope.userID)
      .then(function(data){
        $scope.userStories = data.userStories;
      });

      ////////////////////
      //Edit a Story
      $scope.showEditStoryModal = function (ev, story) {
        
        $scope.currentStory = story;
        
        $mdDialog.show({
          locals:{currentStory: $scope.currentStory},
          controller: EditDialogController,
          templateUrl: 'partials/edit-story-modal.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen,
          openFrom: {
            top: 0,
            width: 30,
            height: 800
          },
          closeTo: {
            right: 1000
          }
        })
          .then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function () {
            $scope.status = 'You cancelled the dialog.';
          });
      };

      function EditDialogController($scope, $mdDialog, currentStory) {

        $scope.currentStory = currentStory;

        $scope.hide = function () {
          $mdDialog.hide();
        };

        $scope.cancel = function () {
          $mdDialog.cancel();
        };

        $scope.updateAStory = function () {
          storiesService.updateAStory($scope.currentStory);
        }

        $scope.deleteAStory = function () {
          storiesService.deleteAStory($scope.currentStory._id);
          $mdDialog.cancel();
        }
      }

      ////////////////////
      //Create a New Story
      $scope.showNewStoryModal = function (ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'partials/new-story-modal.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen,
          openFrom: {
            top: 0,
            width: 30,
            height: 800
          },
          closeTo: {
            right: 1000
          }
        })
          .then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function () {
            $scope.status = 'You cancelled the dialog.';
          });
      };

      function DialogController($scope, $mdDialog) {

        $scope.newStory = {};
        $scope.uploadComplete = true;

        $scope.hide = function () {
          $mdDialog.hide();
        };

        $scope.cancel = function () {
          $mdDialog.cancel();
        };

        $scope.postStory = function () {
          //For demo purposes
          $scope.newStory.public = true;
          $scope.newStory.userID = '592b89d7b63f92043e00835b';
          storiesService.addNewStory($scope.newStory);
          $scope.userStories.push($scope.newStory);
        }

        $scope.uploadFiles = function (file, errFiles) {
          $scope.f = file;
          $scope.errFile = errFiles && errFiles[0];
          if (file) {
            Upload.upload({
              url: 'https://piluftw.s3.amazonaws.com/', //S3 upload url including bucket name
              method: 'POST',
              data: {
                key: file.name, // the key to store the file on S3, could be file name or customized
                AWSAccessKeyId: 'AKIAITLYMBONZTV44RRA',
                acl: 'private', // sets the access to the uploaded file in the bucket: private, public-read, ...
                policy: 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogImFuZ3VsYXItZmlsZS11cGxvYWQifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGtleSIsICIiXSwKICAgIHsiYWNsIjogInByaXZhdGUifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJENvbnRlbnQtVHlwZSIsICIiXSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGZpbGVuYW1lIiwgIiJdLAogICAgWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDUyNDI4ODAwMF0KICBdCn0=',
                signature: '8tP6qriwcyhTnB+fuXyb8jyYFkk=', // base64-encoded signature based on policy string (see article below)
                "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
                filename: file.name, // this is needed for Flash polyfill IE8-9
                file: file
              }
            })
            .then(function (resp) {
              var imageUrl = 'https://piluftw.s3.amazonaws.com/' + resp.config.data.file.name.replace(/ /g, '+');
              $scope.newStory.imageUrl = imageUrl;
            }, function (resp) {
              console.log('Error status: ' + resp.status);
            }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('Upload Progress: ' + progressPercentage + '% ' + 'https://piluftw.s3.amazonaws.com/' + evt.config.data.file.name.replace(/ /g, '+'));
              $scope.uploadComplete = false;
            });;
          }
        }
      }

      ////////////////////
      //Write a comment
      $scope.newComment = {};
      $scope.writeComment = function (story) {
        $scope.newComment.userID = $scope.userID;
        $scope.newComment.storyID = story._id;
        storiesService.addNewComment($scope.newComment);
        var newCommentText = $scope.newComment.commentText
        $scope.userStories.forEach(function(storyItem) {
          if(storyItem._id == story._id)
            storyItem.comments.push({commentText: newCommentText});
        }, this);
        $scope.newComment.commentText = null;
      }
    }]);