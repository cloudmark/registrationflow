// Add Capitalize function to prototype.  
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var casinoApp = angular.module('CasinoApp', ['angular-svg-round-progress','ngRoute']);
casinoApp.service("ShellService", [function(){
  var current = 10; 
  var errors = [];
  this.title = '';

  this.setCurrentValue = function(value){
    current = value;
  };
  
  this.getCurrentValue = function(){
    return current; 
  };
  
  this.addError = function(error){
      errors.push(error);
  };
  
  this.resetErrors = function(){
    errors.length = 0; 
  };
  
  // The controllers will define what the back button should be.  
  // We need a handle on this since the form is really in a series of steps. 
  // and we want to enable the user to go back in the steps.  
  // When the application will grow, the left button will normally go back to the previous route.  
  this.leftButton = undefined; 
    
  this.rightButton = function(){
    console.log("Clicked Right Button"); 
  };
  
  this.errors = errors;
  
}]);

casinoApp.controller("ShellController", ["$window", "$scope", "ShellService", function($window, $scope, shellService){
    this.showProgress = true;     
    this.current = 1; 
    this.max = 1000;
    this.errors = shellService.errors;

    this.title = function(){
        return shellService.title;
    } 

    this.liveChat = function(){
        alert("Clicked LiveChat"); 
    };

    this.leftButton = function(){
        shellService.leftButton && shellService.leftButton(); 
    };
    
    this.rightButton = function(){
        shellService.rightButton(); 
    };
    
    // This is somewhat of a hack.. the UI component used for the progress
    // is limited to value expressions and does not compute functions.  
    var that = this; 
    $scope.$watch(function(scope){
        return shellService.getCurrentValue(); 
    }, function(newValue, oldValue){
        that.current = newValue; 
    });
  
}]); 

casinoApp.controller("RegistrationController", ['$scope', '$timeout', 'ShellService', function($scope, $timeout, ShellService){
    var that = this; 
    this.step = 0; 
    this.buttonMsg = undefined; 
    
    var registrationSteps = {
            1:  {title:'Free Signup',  points: 0},
            2:  {title:'Free Signup',  points: 50, btnName: 'Got It!'},
            3:  {title:'Free Signup',  points: 100},
            4:  {title:'Free Signup',  points: 150}, 
            5:  {title:'Free Signup',  points: 200}, 
            6:  {title:'Free Signup',  points: 300},
            7:  {title:'Free Signup',  points: 400}, 
            8:  {title:'Free Signup',  points: 500, btnName: 'Yes!'},
            9:  {title:'Free Signup',  points: 600}, 
            10: {title:'Free Signup',  points: 700},
            11: {title:'Free Signup',  points: 800}, 
            12: {title:'Free Signup',  points: 900},
            13: {title:'Deposit', points: 1000}
    }

    this.updateNavAndPoints = function(){
        // Update points and title.  
        ShellService.title = registrationSteps[that.step].title;
        ShellService.setCurrentValue(registrationSteps[that.step].points);
        // Update button
        that.buttonMsg = registrationSteps[that.step].btnName;
        
        if (that.step !== 0) {
            ShellService.leftButton = function(){
                that.previousStep(); 
            };
        } else {
            ShellService.leftButton = undefined; 
        }
        
        
        // HACK: Fix for IOS, otherwise the keyboard closes.  
        $('#temp').focus(); 
        window.scrollTo(0,0); 
    };
    
    this.nextStep = function(){
        if (that.step < 13) { 
            that.step += 1; 
        };
        
        that.updateNavAndPoints(); 
    };
        
    this.previousStep = function(){
        if (that.step > 1) {
            that.step -= 1;
        }
        
        that.updateNavAndPoints(); 
    };
    
    this.submit = function(){
        that.nextStep();
    };
    
    this.init = function(){
        // We start from step 0 which means not initialised.  
        that.nextStep(); 
    }
    
    this.init(); 
    
}]); 

casinoApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/registration' , {
        templateUrl: 'registration.html',
        controllerAs: 'regCtrl', 
        controller: 'RegistrationController',
    }).otherwise({
        redirectTo: '/registration'
    });
}]); 

casinoApp.directive('focusme', ['$document', '$timeout', function($document, $timeout) {
    return {
      scope: {
          focusme: '@'
      },
      link: function($scope, $element, attrs) {
          attrs.$observe('focusme', function(value){
              $timeout(function(){
                $element[0].focus();
              }, 0); 
          }); 
      }
    };
}]);

casinoApp.directive('equals', function() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      if(!ngModel) return; // do nothing if no ng-model

      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function() {
        validate();
      });

      // observe the other value and re-validate on change
      attrs.$observe('equals', function (val) {
        validate();
      });

      var validate = function() {
        // values
        var val1 = ngModel.$viewValue;
        var val2 = attrs.equals;

        // set validity
        ngModel.$setValidity('equals', ! val1 || ! val2 || val1 === val2);
      };
    }
  }
});