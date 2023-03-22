# EPAM NodeJS Mentoring Program 

This repository contains the homeworks 2 through 7. They consist in creating a REST service with CRUD operations for a User and Group entity.
This is an ExpressJS application and on subsequent homeworks several functionalities were added, like the use of a Postgres database, sequelize, logging and error handling, jwt authorization and some more.

### Installation

1. Clone repository.
2. Install dependencies with `npm install`.
3. Create the `.env`file with the .env.example file.
4. Run `npm run dev` to start the appliction.

Postman or a similar program is required.

### Usage

1. Try creating your first User:

POST http://localhost:3000/api/users/

Body example:

    {
        "login": "Rob45@hotmail.com",
        "password": "3e4e",
        "age": "22"
    }

Response example:

    {
        "id": "9198bbd8-a2fd-4ffb-a4ff-4fb02e2e8512",
        "isDeleted": false,
        "login": "Rob45@hotmail.com",
        "password": "3e4e",
        "age": 22
    }

2. Create your login token. 

POST http://localhost:3000/api/users/login/

Body example: 
    {
        "login": "Rob45@hotmail.com",
        "password": "3e4e"
    }
    
Response example: 
`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTk4YmJkOC1hMmZkLTRmZmItYTRmZi00ZmIwMmUyZTg1MTIiLCJsb2dpbiI6IlJvYjQ1QGhvdG1haWwuY29tIiwiaWF0IjoxNjc5NTA1NzM4LCJleHAiOjE2Nzk1MDYzMzh9.R_qYPMKc4hPwXg_-R9EVDqnBEH6UMZaGwS_WHrNkdSk"`

This token will be used as the value for `x-access-token` in the headers for other methods authentication.

3. Create a Group entity.

POST http://localhost:3000/api/groups/

Body example:

    {
        "name": "Javascript Group",
        "permissions": ["WRITE", "READ"]
    }

Permissions available: "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";
The name of the group should be unique.

Response example:

    {
        "id": "4eb6c770-7304-4e6b-b201-604b1b965061",
        "name": "Javascript Group",
        "permissions": [
            "WRITE",
            "READ"
        ]
    }

4. Assign a User to a Group with their IDs.

POST http://localhost:3000/api/users/addUserToGroup/

Body example:

    {
        "userId": "9198bbd8-a2fd-4ffb-a4ff-4fb02e2e8512",
        "groupId": "4eb6c770-7304-4e6b-b201-604b1b965061"
    }

Response example:

    {
        "userId": "9198bbd8-a2fd-4ffb-a4ff-4fb02e2e8512",
        "groupId": "4eb6c770-7304-4e6b-b201-604b1b965061",
        "updatedAt": "2023-03-22T17:47:35.367Z",
        "createdAt": "2023-03-22T17:47:35.367Z"
    }

## APIs and Interfaces

### Users

#### GET /api/users/
Returns a list of all users. Needs authorization token.

#### GET /api/users/{id}
Returns one user with the corresponding id given in the URL. Needs authorization token.
Example: GET http://localhost:3000/api/users/9198bbd8-a2fd-4ffb-a4ff-4fb02e2e8512

#### GET /suggestions/{loginSubstring} 
Returns a suggestion of users that begin with the substring. Needs authorization token.
Example: http://localhost:3000/api/users/suggestions/Rob

Example response: 

    [
        {
            "id": "9198bbd8-a2fd-4ffb-a4ff-4fb02e2e8512",
            "login": "Rob45@hotmail.com",
            "password": "3e4e",
            "age": 22,
            "isDeleted": false
        },
        {
            "id": "c5791836-2f9a-4d8f-96c2-32d8f78b27ef",
            "login": "Robbie33@hotmail.com",
            "password": "3e4e",
            "age": 22,
            "isDeleted": false
        }
    ]
    
#### PATCH /api/users/{id}
Update an User that matches the id given in the URL. Needs authorization token.
Example: PATCH http://localhost:3000/api/users/9198bbd8-a2fd-4ffb-a4ff-4fb02e2e8512

Body example: 

    {
        "login": "Samantha@hotmail.com",
        "password": "345e6",
        "age": "35"
    }
    
Response example: 

    {
        "id": "9198bbd8-a2fd-4ffb-a4ff-4fb02e2e8512",
        "login": "Samantha@hotmail.com",
        "password": "345e6",
        "age": 35,
        "isDeleted": false
    }
    
#### POST /api/users/
Creates an User entity. 

#### POST /api/users/login
Creates a login jwt token to be used in the header as `x-access-token`.

#### POST /api/users/addUserToGroup
Adds certain User to a Group.
Example: http://localhost:3000/api/users/addUserToGroup/

Body example: 

    {
        "userId": "9198bbd8-a2fd-4ffb-a4ff-4fb02e2e8512",
        "groupId": "4eb6c770-7304-4e6b-b201-604b1b965061"
    }
    
Response example: 

    {
        "userId": "9198bbd8-a2fd-4ffb-a4ff-4fb02e2e8512",
        "groupId": "4eb6c770-7304-4e6b-b201-604b1b965061",
        "updatedAt": "2023-03-22T17:47:35.367Z",
        "createdAt": "2023-03-22T17:47:35.367Z"
    }
    

#### DELETE /api/users/{id}
Deletes a user that matches the id given in the URL.

### Group 

#### GET /api/groups/
Returns a list of all groups. Needs authorization token.

#### GET /api/groups/{id}
Returns one group with the corresponding id given in the URL. Needs authorization token.
Example: GET http://localhost:3000/api/users/9198bbd8-a2fd-4ffb-a4ff-4fb02e2e8512



