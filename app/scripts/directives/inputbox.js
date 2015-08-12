angular.module('CasinoApp').directive('inputBox', function() {
  return {
    restrict: 'E',
    scope: {
      id: '@',
      model: '=',
      type: '@',
      placeholder: '@',
      focus: '@', 
      text: '@', 
      minlength: "@",
      maxlength: "@", 
      pattern: "@"
    },
    templateUrl: 'partials/inputbox.html'
  };
});