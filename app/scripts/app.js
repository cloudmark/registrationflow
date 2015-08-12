var casinoApp = angular.module('CasinoApp', ['angular-svg-round-progress','ngRoute']);
angular.module('CasinoApp').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/registration', {
        templateUrl: 'partials/registration.html',
        controller: 'RegistrationCtrl', 
        controllerAs: 'regCtrl'
      }).otherwise({
        redirectTo: '/registration'
      });
}]);