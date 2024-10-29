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
-NEVER TRUST req.body -----> need data sanitizations

-Validate bcrypt package
-Create PasswrordHash using bcrypt.hash & save the user is excrupted password
-Create login API
-Compare password and throw errors if email or password is invalid


-install cookie-parser
-just send a dummy cookie to user
-create a GET/profile API and check if you get the cookie back
-install jsonwebtoken
-IN login API, after email ans password validation, craete a JWT token and send it to user in cookie
-read the cookie inside your profile API and find the logged in user
-userAuth middleware
-Add the userAuth middle ware in profile API and a new sendConnectionRequest API
-Set the expiry of JWT token and cookies to 7 days
-Create userSchema method to getJWT()
-Create UserSchema method to comparepassword(passwordInputByUser)


-Explore tinder APIs
-Create a List all APi you can think of in DEV Tinder
-Group multiple routes under respective routers
-Read documentation for express.Router
-Create routes folder for managing auth, profile, request routers
-Create authrouter, profileRouter, requestRouter
-Import these router in app.js
-Create POST /logout API
-Create PATCH /profile/edit
-Create PATCH /profile/password API  => forgot password API
-Make you validate all data in every POST,PATCH api's


- Create connection Request Schema
- send Connection Request API
- Proper validation of Data
- Think about ALL corner cases
- $or query $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query/or/
- Schema.pre() middleware function 
- Read more about indexes in MongoDB
- why do we need index in DB
- what is the advantages and disadvantages of creating?
- Read this arcticle about compond indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- Always think about cornor cases


-Write code with proper validations for POST /request/review/:status/:requestId
-Thought process - POST vs GET
- Read about ref and populate - https://mongoosejs.com/docs/populate.html
- Create GET /user/request/received with all checks
- Create GET GET/user/connections 

-Logic for GET /feed API
-Explore the $nin, $ne, and other query operators
-Paginations

/feed?page





