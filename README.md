"# superheralliance" 

##Program Structure

Backend:-
Database :- mongoDB Version 3.0
Server :- Nodejs with Express 4.14.0

Frontend:-
Framework :- AngularJS 1.5.8
Libraries :- Bootstrap 3.3.7, visjs 4.17.0

##Description

The program is having only one page, it uses AngularJS as the frontend framework and uses bootstrap and visjs libraries for UI design and intuitive visualisation.
The AppCtrl is used to facilitate two way binding between the view and the controller (controller.js), and it calls RESTful backend services from Node.js (server.js).
Express is used as the server.
The application uses GET , PUT and POST services to retrieve data, update and create data in the database.
There is one db defined as 'relationlist' which holds all the character relations which is being entered by the user.

##The basic control flow

1. User goes to localhost:3000 to view the landing page.
2. User enters the two characters and the relationship betweent them and clicks the Add/Update Relation button.
3. The data is accessed in the controller and its first checked if the relationship exist or not.
4. If the relationship exists them the state is updated to the new one.
5. If its a new relationship then a new entry is made in the collection.
6. Once the appropriate operation is done the new relation list is fetched and the visualisation is drawn.

##Steps to setup the application.

1.Clone the repository.
2.Install npm.
2.Run npm install and bower install.
3.Install and setup mongoDB server.
4.Open a command prompt go to the folder which has mongod.exe and run mongod to start the mongoDB server.
5.Open another command prompt and go to the folder which has mongo.exe and run command mongo and it will be connected test db.
6.Create a db realtionlist by entering the command 'use relationlist'.
7.insert one record into it using the command db.relationlist.insert({parent:'superman',child:'batman',relation:'ALLIANCE'})(Optional).
7.Open third command prompt Go to the porject root folder and run 'node server' and you will see the message 'Server running on port 3000' in the console.
8.Open a browser and type in localhost:3000


