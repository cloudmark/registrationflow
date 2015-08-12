angular.module('CasinoApp').directive('dateOfBirth', ['$timeout', function($timeout){
    function link(scope, element, attrs, ctrl){
        if (ctrl){
            if (element.val() !== '') {
                $timeout(function() {
                    return ctrl.$setViewValue(element.val());
                }, 0);
            }
        }
        
        // Read the value.  
        var read = function() {
            return ctrl.$setViewValue(element.val());
        };
        
        var process = function(value){
            if (!value){
                return value; 
            }
            
            var converter = function(value){
                var withoutDash = value.replace(/-/g, ' ');
                var singleSpace = withoutDash.replace(/\s+/g, ' ');
                var onlyDigitsAndSpaces = singleSpace.replace(/[^\d^\s]/g,'');
                var dateFormatted = onlyDigitsAndSpaces.replace(/([\d]{1,2}) ([\d]{1,2}) ([\d]{2})[\d]*[\s]*/g, '$1 - $2 - $3');
                if (dateFormatted.indexOf('-') === -1){
                    var dateFormatted = onlyDigitsAndSpaces.replace(/([\d]{1,2}) ([\d]{1,2}) ([\d]{1,2})[\s]*/g, '$1 - $2 - $3');
                    if (dateFormatted.indexOf('-') === -1){
                        dateFormatted = onlyDigitsAndSpaces.replace(/([\d]{1,2}) ([\d]{1,2})[\s]+/g, '$1 - $2 - ');
                        if (dateFormatted.indexOf('-') === -1){
                            dateFormatted = onlyDigitsAndSpaces.replace(/([\d]{1,2}) ([\d]{2})[\s]*/g, '$1 - $2 - ');
                            if (dateFormatted.indexOf('-') === -1){
                                dateFormatted = onlyDigitsAndSpaces.replace(/([\d]{1,2})[\s]+/g, '$1 - ');
                                if (dateFormatted.indexOf('-') === -1){
                                    dateFormatted = onlyDigitsAndSpaces.replace(/([\d]{2})[\s]*/g, '$1 - ');
                                }
                            }
                        }
                    }
                }
                var converted = dateFormatted; 
                return converted; 
            }
             
            var converted = converter(value); 
            
            if (value !== converted){
                ctrl.$setViewValue(converted);
                ctrl.$render();
            }
            return converted; 
        }
        
        // Set a formatter 
        ctrl.$formatters.push(function(value) {
            return process(value); 
        });
        
        // Set the parser which controllers the field.  
        ctrl.$parsers.push(function(value) {
            return process(value); 
        });
        
        ctrl.$validators.validateNumber = function(modelValue, viewValue) {
            var valid = true; 
            var properDate = true; 
            if (modelValue){
                var splitParts=modelValue.replace(/ /g,'').split('-');
                if (splitParts.length === 3) {
                    splitParts.forEach(function(x){
                        if (x === ""){
                            properDate = false; 
                        }
                    });
                } else {
                    properDate = false;
                }
            } else {
                properDate = false;
            }
            
            if (element.attr('required')) {
              if (modelValue) {
                valid = valid && properDate;
              }
            } 
            
            if (properDate){
                var splitParts=modelValue.replace(/ /g,'').split('-');
                var modifiedDate = '19' + splitParts[0] + '-' + splitParts[1] + '-' + splitParts[2]; 
                if (isNaN(Date.parse(modifiedDate))){
                    valid = valid && false;
                }
            }
            return valid; 
        };
        
        
        element.on('keydown', function(event){
            if( event.keyCode == 8 || event.keyCode == 37 ){
                var caret = element[0].selectionStart; 
                var tempValue = element.val();
                // Run backwards till we meet a digit
                for (var i = caret - 1; i >= 0; i--){
                    if(/^\d+$/.test(tempValue.charAt(i))){
                        caret = i; 
                        break;
                    };
                }
                var chopped = tempValue.substring(0, caret); 
                ctrl.$setViewValue(chopped);
                ctrl.$render();
                event.preventDefault(); 
            } else {
                return scope.$evalAsync(read);
            }
        }); 
        
        element.on('click', function(event){
            var caret = element[0].selectionStart; 
            var tempValue = element.val();
            var chopped = tempValue.substring(0, caret); 
            ctrl.$setViewValue(chopped);
            ctrl.$render();
            event.preventDefault(); 
        }); 
        
        element.on('blur change', function(event) {
            return scope.$evalAsync(read);
        });
        
        element.on('$destroy', function() {
            return element.off('blur keydown change click');
        });
    }
    return {
        require: '^ngModel',
        restrict: 'A', 
        link: link
    }
}]);