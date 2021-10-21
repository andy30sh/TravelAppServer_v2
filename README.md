Project Title - SEE Travel App Server

This project aim to build up a backend server serve the travel mobile application with RESTful APIs outlined:
1. New user registration
2. User account activation (Verify email address)
3. User Login
4. Change user password
5. Forget user password
6. Reset user password
7. Get destination list
8. Get destination covid status and information
9. Get all user accounts (Development test only)


Getting Started

Dependencies:
1. Operation system: Windows, MacOS or Linux
2. Application: Node.js version 14
3. Database: MongoDB Community Server
4. SMTP server: any accessable SMTP server e.g. Google Mail

Development Tools:
1. Visual Studio Code
2. Postman

Installing:
1. git clone https://github.com/andy30sh/TravelAppServer_v2.git
2. config mailac.js
    2.1 Open mailac.js file with code editor
    2.2 Edit the SMTP server config, e.g. for your own Google mail account
    2.3 Save the file
3. npm install
4. npm run start

Testing:
1. When you see the 'Travel App Server RESTful API server started on: 8088' message in console mean server ready for accept connection from port 8088
2. Use Postman program as the RESTful client
    2.1 Enter URL and select the method (GET or POST) e.g. http://localhost:8088/user/forget (POST)
    2.2 Click 'Body' tag and select 'x-www-form-urlencoded' tag
    2.3 Enter 'Key' and 'Value' for request parameters
    2.4 Click 'Send' to submit the request
    2.5 Get the response result in bottom session
    2.6 Click 'Save' to store and reuse the request


RESTful APIs:

1.	RESTful API – Create new user
Path:	
/user/create    e.g,. http://localhost:8088/user/create
Method (POST/GET):	
POST (x-www-form-urlencoded)
Request Parameters:	
•	first_name (mandatory)
•	last_name (mandatory)
•	email (mandatory)
•	login_id (mandatory)
•	password (mandatory)
Response Result	Success: 
return (JSON) {login_id, login_token, last_login_date}
{
    "user_login": "aliceg",
    "login_token": "xa0SOGkvwLTblkEM",
    "last_login_date": null
}
Fail: 
return error message e.g. Activate fail!


2.	RESTful API – List all users (Development test only)
Path:	
/user   e.g,. http://localhost:8088/user
Method (POST/GET):
GET
Request Parameters:
Nil
Response Result	Success: 
return (JSON) all user objects
[
    {
        "_id": "6170140f413337e98a2f9fe3",
        "first_name": "David",
        "last_name": "Li",
        "email": "david.li@myemail.com",
        "login_id": "davidli",
        "password": "d41d8cd98f00b204e9800998ecf8427e",
        "login_token": "Okx8eH4s0guLvyWb",
        "last_login_date": "2021-10-20T15:19:04.402Z",
        "status": [
            "normal"
        ],
        "activation_token": "xxx",
        "created_date": "2021-10-20T13:05:19.885Z",
        "__v": 0
    },
    {
        "_id": "617015f91b03956cefb2b72b",
        "first_name": "Peter",
        "last_name": "Wood",
        "email": "david.li@myemail.com",
        "login_id": "peterw",
        "password": "cb28e00ef51374b841fb5c189b2b91c9",
        "login_token": "",
        "last_login_date": null,
        "status": [
            "pending"
        ],
        "activation_token": "hYpDk424dXz1ktMt",
        "created_date": "2021-10-20T13:13:29.084Z",
        "__v": 0
    }
]
Fail: 
return error message


3.	RESTful API – user account activate (Email verification)
Path:
/user/activate  e.g,. http://localhost:8088/user/activate
Method (POST/GET):
POST (x-www-form-urlencoded)
Request Parameters:
•	userId (mandatory)
•	password (mandatory)
•	activateCode (mandatory)
Response Result	Success: 
return (JSON) {user_login, created_date}
{
    "user_login": "aliceg",
    "created_date": "2021-10-20T15:46:57.739Z"
}
Fail: 
return error message e.g. duplicate login_id


4.	RESTful API – User login
Path:
/user/login     e.g,. http://localhost:8088/user/login
Method (POST/GET):
POST (x-www-form-urlencoded)
Request Parameters:
•	userId (mandatory)
•	password (mandatory)
Response Result	Success: 
return (JSON) {user_login, login_token, last_login_date}
{
    "user_login": "aliceg",
    "login_token": "eUy2wbB6bnVz4Zj2",
    "last_login_date": "2021-10-20T15:52:29.511Z"
}
Fail: 
return error message e.g. Account not active!; Login fail!


5.	RESTful API – Change user password
Path:
/user/password      e.g,. http://localhost:8088/user/password
Method (POST/GET):
POST (x-www-form-urlencoded)
Request Parameters:
•	userId (mandatory)
•	password (mandatory)
•	newPassword (mandatory)
Response Result	Success: 
return (JSON) {user_login, login_token, last_login_date}
{
    "user_login": "aliceg",
    "login_token": "d8wFswRbvHnIotFe",
    "last_login_date": "2021-10-20T15:58:01.127Z"
}
Fail: 
return error message e.g. Incorrect login ID and email!


6.	RESTful API – Forget user password
Path:
/user/forget    e.g,. http://localhost:8088/user/forget
Method (POST/GET):
POST (x-www-form-urlencoded)
Request Parameters:
•	userId (mandatory)
•	email (mandatory)
Response Result	Success: 
return (JSON) {user_login, status}
{
    "user_login": "davidli",
    "status": [
        "normal"
    ]
}
Fail: 
return error message e.g. Change password fail!


7.	RESTful API – Reset user password
Path:
/user/reset     e.g,. http://localhost:8088/user/reset
Method (POST/GET):
POST (x-www-form-urlencoded)
Request Parameters:
•	userId (mandatory)
•	activateCode (mandatory)
•	newPassword (mandatory)
Response Result	Success: 
return (JSON) {user_login, login_token, last_login_date}
{
    "user_login": "aliceg",
    "login_token": "6LezvjySep45s9TT",
    "last_login_date": "2021-10-20T16:03:35.376Z"
}
Fail: 
return error message e.g. Change password fail!


8.	RESTful API – Destination list
Pending to edit


9.	RESTful API – Destination information 
Pending to edit
