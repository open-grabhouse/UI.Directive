! function(window, angular) {
  'use strict';
  angular.module('staticContent', [])
    .provider('staticContent', ['$provide', function($provide) {

      this.dataUrl = "data.json";

      this.setUrl = function(url) {
        this.dataUrl = url;
      };

      this.$get = ['$http', '$q', function($http, $q) {
        var self = this;
        return {
          fetchData: function(resource) {
            var defer = $q.defer();
            $http({
              method: "GET",
              url: resource || self.dataUrl
            }).then(function(data) {
              defer.resolve(data);
            });

            return defer.promise;
          },
          setUrl:self.setUrl
        };
      }];

    }])
    .directive("ghStatic", function(staticContent) {
      return {
        restrict: 'E',
        scope:true,
        templateUrl: function(elem, attr) {
          return attr.template;
        },
        controller: function($scope,$element,$attrs) {
          staticContent.fetchData($attrs.resource).then(function(data) {
            $scope.staticData = data;
            console.log(data);
          });
        },
        replace: true
      };
    });

}(window, window.angular);
