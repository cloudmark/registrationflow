angular.module('CasinoApp').directive('errorWidget', function() {
  return {
    restrict: 'E',
    scope: {
      errors: '='
    },
    templateUrl: 'partials/errorwidget.html'
  };
});