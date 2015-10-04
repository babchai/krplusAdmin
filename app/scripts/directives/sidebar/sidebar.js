'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
  .directive('sidebar',['$location',function() {
    return {
      templateUrl:'scripts/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope , $firebaseArray){
        $scope.selectedMenu = 'dashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;
        
        var categoriesRef = new Firebase("https://9lives.firebaseio.com/categories");

        $scope.categories = $firebaseArray(categoriesRef);

         var faceRef = new Firebase("https://9lives.firebaseio.com/categories/face-matrix/child");
         $scope.faces = $firebaseArray(faceRef);

         var stylistRef = new Firebase("https://9lives.firebaseio.com/categories/stylist/child");
         $scope.stylist = $firebaseArray(stylistRef);

        $scope.check = function(x){
          
          if(x==$scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };
        
        $scope.multiCheck = function(y){
          
          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };
      }
    }
  }]);
