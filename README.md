# Registration POC
This is a proof of concept for a seamless registration flow on mobile.  Seemlingly simple, it is quite hard to keep the virtual keyboard open on iOS and this POC illustrates how to achieve this. 

To preview this application click [here](https://damp-coast-3989.herokuapp.com).  

The code is in the `app` folder.  

# Installation 
The project uses `grunt` and `bower` because they rock! To run the application perform the following steps:

## Node

First install Node and run: 

    npm install
  
This will install `grunt` and `bower`

## Bower
Download the client libraries using the following command 

    bower install
  
## Run the server 
To run the server in development mode you can use the following command 

    grunt serve 
  
  
# Deployment 
The application is configured to pass through the normal modern HTML5 build pipeline (minification, uglify, angular templates etc).  To deploy the application run the following command 

    grunt build
  
This will produce a `public` folder which is ready to deploy.  To deploy to Heroku from this step use the following command
  
    git push heroku master


## Alternative Heroku Deployment
To deploy the Registration Flow on Heroku, click the button below:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)