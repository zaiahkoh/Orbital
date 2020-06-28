# Orbital
Backend server for ModTree. Built using Node.js and Express.js framework.

Relies on a local MongoDB database for all graduation requirements and faculty
rules.

Also relies on NUSmods API to run functions.

## API routes
### '/rules'
> GET /:tag
> 
> Receives a tag and returns a JSON object containing the rule. Each rule has the
> following tags:
> 
> * name: String //Title of the rule
> * tag: String //Used when querying the API
> * id: String //Only used by the backend
> * desc: String //Description of the rule and how to fulfill it
> * sub: Array //An array of Strings. Each String is a tag for another rule

### '/eval
> POST /
> 
> Receives a JSON object containing two tags:
> 
> * tag: String //Used to query the API for the rule to be used in evaluation
> * modPlan: Object which has a 'modules' tag that refers to an array of moduleCodes
> 
> Returns a boolean, depending on whether the modPlan fulfills the rule

### '/user'
> POST /register
> 
> Receives a request body containing the following:
> 
> * name: String //Username of the new user being registered. Must be alphanumeric and between 3 to 30 char long
> * email: String //Email string
> * password: String //Password
> * password2: String //Must exactly match password
> 
> If there are errors, will respond with a 400 ERROR and a JSON object containing a list of errors
> 
> Else, will respond with 200 SUCCESS and a JSON object containing the registered username and email

> POST /login
> 
> Receives a request body containing the following:
> 
> * email: String //Email string
> * password: String //Password
> 
> If there are errors, will respond with a 400 ERROR and a JSON object containing a list of errors
>
> Else, will respond with 200 SUCCESS and a JSON object containing a JSON Web Token under the Bearer schema

> POST /sociallogin
>
> Receives a request body containing the following:
> 
> * network: String ['facebook', 'google']
> * token: String (access_token for Facebook and id_token for Google)
> 
> If the user has not signed up before, the server will automatically create an account and return a JWT for future authentication.
> If the user has already signed up, returns a JWT that is linked to the existing account.

### '/account'
> GET /
>
> The request must include a JSON Web Token in the Authorisation header under the Bearer schema
> 
> Returns all information about the user as a JS Object

> PUT /
> 
> The request must include a JSON Web Token in the Authorisation header under the Bearer schema
> Should include a request body with the attributes of the user that the client wants to update
> Possible attributes are
> 
> * modPlan: Object
> * name: String
> * residential: String
> * major: String
> * matriculationYear: String
> * targetGradYear: String
> * transcript: Object
> * cap: String
> * targetCap: String
> 
> If successful, responds with 200 OK and JSON with attributes
> * success: Boolean (true if update successful)
> * updated: Object (list of attributes that were updated)
> 
