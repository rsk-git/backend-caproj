# Capstone Backend Project

# Description
This is the Recipe Search backend application built with MERN(MongoDB, Express, React and Node.js).  The app allows users to search for their vegetarian recipes and the details. The backend uses third party API, intereacts to fetch requested recipe data and manages user data using MongoDB.
User Authentication:New user registration, login and authentication.
Error Handling: Appropriate messages display or redirecting the users accordingly.
CORS: allows interaction between frontend and backend when hosted.

# Technologies
* MongoDB: NoSQL database for storing data
* Express: Web app framework for Node.js
* Mongoose: ODM library for MongDB and Node.js
* dotenv: Loads environmental variables from .env to process.env
* Axios: HTTP client for making requests to third-party API.
*Node.js: Backend javascript runtime environment.The file extensions are .js 

# how to install and run the project
* Node.js: install Node.jsV12 or higher
* MongoDB: set up MongoDB instance.
* API Key: obtain API key from recipe data provider.

# Folders
* controllers - define core application logic (handling requests)for each resouce, like recipeController.js and userController.js.
The authMiddleware.js file handles authentication in a Node.js/Express application, by checking the valid tokens.  So, only authorized users are allowed.It can be imported only is route files where needed.  For example, in the recipes.js.
* models - Mongoose models define data schema for MongoDB collections. The recipeModel.js and userModel.js specifies validaton, data relatioships and structure.
*routes - each route file, recipeRouter.js and userRouter.js, maps URL to controller methods and for different resources.
* index.js - Main part of the server, connects with database, starts server and set up the express app.

# usage of the project
Users can search recipes, create own recipes and also safe to create login and authentication

# include credits - if followed any tutorials, certain materails etc.,
followed Perscholas materials and stackflow.