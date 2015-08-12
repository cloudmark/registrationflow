angular.module('CasinoApp').directive('focusme', ['$document', '$timeout', function($document, $timeout) {
    return {
      scope: {
          focusme: '@'
      },
      link: function($scope, $element, attrs) {
          attrs.$observe('focusme', function(value){
              if (value === "true"){
                $timeout(function(){
                    $element[0].focus();
                }, 0); 
              }
          }); 
      }
    };
}]);