'use strict';

/**
 * @ngdoc service
 * @name piluApp.awsS3OperationsService
 * @description
 * # awsS3OperationsService
 * Service in the piluApp.
 */
angular.module('piluApp')
  .service('awsS3OperationsService', ['appConfig', '$http', '$window', 'Upload', '$timeout', function (appConfig, $http, $window, Upload, $timeout) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
      getPublicStories: function (file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
          $http({
            method: 'GET',
            url: appConfig.apiUrl + '/sign_s3',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
            .then(function successCallback(response) {
              console.log('Response: ', response);
              // make request to your own backend to get signature and other data
              var signature = response.data.signature;
              var policyBase64 = response.data.policy;
              var date = response.data.date;
              var credentials = response.data.credentials;
              var expiration = response.data.expiration;
              var sessionToken = response.data.sessionToken;

              Upload.upload({
                url: 'https://piluftw.s3.amazonaws.com/',
                method: 'POST',
                data: {
                  key: file.name,
                  acl: 'private',
                  Policy: policyBase64,
                  'X-Amz-Credential': credentials,
                  'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
                  'X-Amz-Date': date,
                  'X-Amz-Signature': signature,
                  'X-Amz-Security-Token': sessionToken,
                  file: file
                }
              })
                .then(function (resp) {
                  console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                  console.log('Error status: ' + resp.status);
                }, function (evt) {
                  var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                  console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }, function errorCallback(error) {
              console.log('Error: ', error)
            });
        }
      }
    }
  }]);
