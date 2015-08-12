angular.module('CasinoApp').directive('phoneNumber', ['$timeout', function($timeout){
    function link(scope, element, attrs, ctrl){
        // Parse the country code.  
        options = {
            prefix: '(0)',
            defaultCountry: 'sv',
        };
        
        angular.forEach(options, function(value, key) {
            var option;
            if (!(attrs.hasOwnProperty(key) && angular.isDefined(attrs[key]))) {
              return;
            }
            option = attrs[key];
            return options[key] = option;
        });
        
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
            var removeBrackets = value.replace(/(\(.*?\))/g, '');
            var noDigits = removeBrackets.replace(/[^\d]/g, '');
            var converted = options.prefix + ' ' + noDigits.replace(/(.{3})/g, '$1 ').trim();
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
        
        // Control the validator associated with this 
        ctrl.$validators.internationalPhoneNumber = function(modelValue, viewValue) {
            var valid = true; 
            if (element.attr('required')) {
              if (modelValue) {
                valid = valid && (modelValue.length > (options.prefix.length + 1));
              }
            } 
            return valid; 
        };
        
        element.on('blur keyup change', function(event) {
            return scope.$evalAsync(read);
        });
        
        element.on('$destroy', function() {
            return element.off('blur keyup change');
        });
    }
    return {
        require: '^ngModel',
        restrict: 'A', 
        link: link
    }
}]); 