angular.module('CasinoApp').controller("RegistrationCtrl", ['$scope', '$http', '$timeout', 'ShellService', function($scope, $http, $timeout, shellService){
    var that = this; 
    this.step = -1; 
    this.buttonMsg = undefined; 
    this.isInPassword = true; 
    this.isInPasswordConfirm = false;
    
    this.user = {
        email : undefined,
        password : undefined, 
        confirmPassword : undefined, 
        username : undefined, 
        firstName : undefined, 
        lastName : undefined, 
        dateOfBirth : undefined, 
        country : 'sweden', 
        city : undefined, 
        postcode : undefined, 
        address : undefined, 
        phoneCountryCode : '+46', 
        phoneNumber : ' '
    }
        
    var registrationSteps = {
            '-1':  {
                    init: function(){}, 
                    validation: function(){ return true; }
                },
            0:  {
                    title:'Free Signup', 
                    points: 0, 
                    init: function(){}, 
                    btnName: "Sign Up!",
                    validation: function(){
                        return true; 
                    }
                },                      
            1:  {
                    title:'Free Signup 1/12', 
                    points: 0, 
                    init: function(){}, 
                    validation: function(){
                        var valid  = true; 
                        if (that.user.email === undefined) {
                            shellService.addError("Oops! This is not a valid e-mail address!");
                            valid = false;
                        }
                        return valid; 
                    }
                },
            2:  {
                    title:'Free Signup 2/12',  
                    points: 50, 
                    btnName: 'Got It!', 
                    init: function(){}, 
                    validation:  function(){ return true;}
                },
            3:  {
                    title:'Free Signup 3/12',  
                    points: 100,
                    init: function(){
                        that.isInPassword = true; 
                        that.isInPasswordConfirm = false;
                    }, 
                    validation:  function(){ 
                        var valid = true;
                        if (that.user.password === undefined || that.user.confirmPassword === undefined || that.user.password !== that.user.confirmPassword ){
                            shellService.addError("Oops! The passwords do not match!"); 
                            valid = false; 
                        }

                        return valid; 
                    }
                },
            4:  {
                    title:'Free Signup 4/12',  
                    points: 150,
                    init: function(){}, 
                    validation:  function(){ 
                        var valid = true;
                        if (that.user.username === undefined){
                            shellService.addError("Oops! Can you think of another username?"); 
                            valid = false; 
                        }
                        return valid; 
                    }
                }, 
            5:  {
                    title:'Free Signup 5/12',  
                    points: 200,
                    init: function(){}, 
                    validation:  function(){ 
                        var valid = true;
                        if (that.user.firstName === undefined){
                            shellService.addError("Oops! Are you sure that is your first name? Seems a bit short..");
                            valid = false; 
                        }
                        return valid;  
                    }
                }, 
            6:  {
                    title:'Free Signup 6/12',  
                    points: 300,
                    init: function(){}, 
                    validation:  function(){ 
                        var valid = true;
                        if (that.user.lastName === undefined){
                            shellService.addError("Oops! Are you sure that is your last name? Seems a bit short.."); 
                            valid = false; 
                        }  
                        return valid;  
                    }
                },
            7:  {
                    title:'Free Signup 7/12',  
                    points: 400,
                    init: function(){}, 
                    validation:  function(){ 
                        var valid = true;
                        if (that.user.dob === undefined){
                            shellService.addError("Oops! There seems to be something wrong with that date of birth!"); 
                            valid = false; 
                        }
                        return valid; 
                    }
                }, 
            8:  {
                    title:'Free Signup 8/12',  
                    points: 500, 
                    btnName: 'Yes!',
                    init: function(){}, 
                    validation:  function(){ return true; }
                },
            9:  {
                    title:'Free Signup 9/12',  
                    points: 600,
                    init: function(){}, 
                    validation:  function(){ 
                        var valid = true;
                        if (that.user.postalCode === undefined){
                            shellService.addError("Oops! There seems to be something wrong with that postal code!"); 
                            valid = false; 
                        }
                        return valid; 
                    }
                }, 
            10: {
                    title:'Free Signup 10/12',  
                    points: 700,
                    init: function(){
                        if (that.user.city === undefined){
                            var query = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:"+that.user.postalCode+"|country:" + that.user.country; 
                            $http.get(query).then(function(response) {
                                if(response && response.data && response.data.results){
                                    var results = response.data.results;
                                    if (results.length > 0){
                                        var result = results[0]; 
                                        var address_components = result.address_components; 
                                        if (address_components){
                                            address_components.filter(function(address){
                                               if (address.types.indexOf("postal_town") !== -1){
                                                   // Prefill the address
                                                   that.user.city = address.long_name;
                                                   // that.user.address = response.data.results[0].formatted_address; 
                                                }
                                            }); 
                                        }
                                    }
                                }
                            });
                        }
                    }, 
                    validation:  function(){
                        var valid = true;
                        if (that.user.city === undefined){
                            shellService.addError("Oops! There seems to be something wrong with that!"); 
                            valid = false; 
                        }
                        return valid; 
                    }
                },
            11: {
                    title:'Free Signup 11/12',  
                    points: 800,
                    init: function(){}, 
                    validation:  function(){ 
                        var valid = true;
                        if (that.user.address === undefined){
                            shellService.addError("Oops! There seems to be something wrong with that address!"); 
                            valid = false; 
                        }
                        return valid; 
                    }
                }, 
            12: {
                    title:'Free Signup 12/12',  
                    points: 900,
                    init: function(){}, 
                    validation:  function(){
                        var valid = true;
                        if (that.user.phoneCountryCode === undefined){
                            shellService.addError("Oops! Please select a country code!"); 
                            valid = false; 
                        }
                        if (that.user.phoneNumber === undefined){
                            shellService.addError("Oops! There seems to be something wrong with that phone number!"); 
                            valid = false; 
                        }
                        return valid; 
                    }
                },
            13: {
                    title:'Deposit', 
                    points: 1000,
                    init: function(){}, 
                    validation: function(){ return true; }
                }
    }

    this.updateNavAndPoints = function(){
        // Update points and title.  
        shellService.title = registrationSteps[that.step].title;
        shellService.setCurrentValue(registrationSteps[that.step].points);
        // Update button
        that.buttonMsg = registrationSteps[that.step].btnName;
        
        if (that.step !== 0) {
            shellService.leftButton = function(){
                that.previousStep(); 
            };
        } else {
            shellService.leftButton = undefined; 
        }
        
        
        // HACK: Fix for IOS, otherwise the keyboard closes.  
        if (that.step !== 13) {
            $('#temp').focus();
        }
        
        $timeout(function(){
            window.scrollTo(0, 0);
            window.scrollTo(0, 75);
        });
        // window.scrollTo(0, 55);
        // Call the initialise funciton 
        registrationSteps[that.step].init(); 
    };
    
    this.nextStep = function(){
        var nextStepInternal = function(){
            shellService.resetErrors(); 
            if(registrationSteps[that.step].validation()){
                if (that.step < 13) { 
                    that.step += 1; 
                };

                that.updateNavAndPoints(); 
            } else {
                // So that the user can see the error!
                window.scrollTo(0,0);
            }

        }
        
        if(that.step !== 13) {
            if (that.step === 3) {
                if (that.user.password && that.user.confirmPassword) {
                   nextStepInternal();   
                } else if (that.user.password) {
                    $('#temp').focus();
                    that.isInPassword = false; 
                    that.isInPasswordConfirm = true; 
                } 
            } else {
                nextStepInternal(); 
            }
        }
    };
        
    this.previousStep = function(){
        if (that.step > 1) {
            that.step -= 1;
        }
        
        that.updateNavAndPoints(); 
        
        shellService.resetErrors(); 
    };
    
    this.submit = function(e){
        that.nextStep();     
    };
    this.nextStep(); 
    
}]); 