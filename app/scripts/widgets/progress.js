angular.module('CasinoApp').directive('progressWidget', function() {
  return {
    restrict: 'E',
    scope: {
      errors: '=', 
      current: '=', 
      max: '=', 
      showProgress: '='
    },
    templateUrl: 'partials/progresswidget.html'
  };
});