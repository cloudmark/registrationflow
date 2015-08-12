angular.module('CasinoApp').service("ShellService", [function(){
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
  this.leftButton = function(){
    console.log("Clicked Left Button"); 
  };; 
    
  this.rightButton = function(){
    console.log("Clicked Right Button"); 
  };
  
  this.errors = errors;
  
}]);