- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Create a server
- Listen to a port 7777
- Write request handlers for /test. /hello
- Install nodemon and updates scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde (^ vs ~)

- Initialize git
- .gitignore
- create a remote repo on github
- push all code to remote origin
- play with routes and route extensions .hello, .hello/2, /xyz
- Order of the routes matter a lot
- Install Postman app and make a workspace/collection > test API call 
- Write logic to handle GET,POST,PATCH,DELETE API Calls and test them on Postman
- Explore routing and use of ?, +, (), * in the routes
- Use of regex in routes /a/, /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes..

- Multiple Route handlers - Play with the code
- next()
- next functions and errors along with the res.send()
- app.use("/route",rH,rH2,[rH3,rH4],rH5)
- what is a Middleware? Why do we need it?
- How express JS basically handles request behind the scenes
- Differences app.use and ap.all
- Write a dummy wuth middlewares for admins
- Write a dummy auth middlewares for all the user routes, except /user/login
- Error handling using -> app.use('/',(err,req,res,next) ={})
- Create a free cluster on mondoDB official websites (Mongo Atlas)
- Install mongoose library
- Connect your application to the Databse Connection-url"/devTinder
- Call the connection function and connect to the databasebefore starting application on 7777.
- Create a userScema
- Create /signup API to add data to database
- push some documents using POST  API calls from postman

- Difference between javscript object and json
- Add the express.json() middlewares to your app.
- Make your signup API dynamic to recieve data from the end user

- API- Get user by email
- API- Feed API- GET/feed - get all the users from the database
- Create a delete user API
- Difference between PATCH and PUT
- API - Update a user
- Explore the Mongoose Documentation for Model methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - update the user with email ID

- Explore schematype options from the documentation
-Add required, unique, lowercase, min, minlength,trim
-Create a custom validation function for gender
-Improve the DB scema - PUT all appropriate validations on each field in schema.
-Add API level validation on patch request & Signup post api
-Data Sanitizations - Add API validations for each field
-Install validator npm package
-Explore validator library functions and Use validator funcs for passowrd,emailID




