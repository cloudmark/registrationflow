angular.module('CasinoApp').controller("ShellCtrl", ["$window", "$scope", "ShellService", function($window, $scope, shellService){
   var that = this; 
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
        shellService.leftButton(); 
    };
    
    this.rightButton = function(){
        shellService.rightButton(); 
    };
    
    // This is somewhat of a hack.. the UI component used for the progress
    // is limited to value expressions and does not compute functions.  
    $scope.$watch(function(scope){
        return shellService.getCurrentValue(); 
    }, function(newValue, oldValue){
        that.current = newValue; 
    });
  
}]); 