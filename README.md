# Part 1 / 2 - Cromwell developer test

## Versions Used

* Node : 17.6.0
* PSQL : 12.10

## How to run

Follow the next steps

1. ``` git clone https://github.com/AngelosGR21/cromwell-node-server.git```
2. Install the packages ~ ``` npm i ```
3. Run ``` npm run setup-db ``` to create the databases needed
4. Now to seed the database run ``` npm run seed-db ```
5. Execute tests ``` npm test ``` 
6. Finally to run the server ``` npm start ```


Frontend repository --- https://github.com/AngelosGR21/cromwell-react-app

## Credentials
email: `alex@gmail.com`<br>
password: `AlexMele55!`

## Routes bult
GET - / - returns 200 with a simple message<br>
GET - /user - decrypts a JWT token and returns the payload<br>
POST - /user/register - creates a new user with the following details [firstName, lastName, password, email]<br>
POST - /user/login - user login with [email, password]<br>


