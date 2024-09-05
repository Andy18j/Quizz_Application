# Quizz_Application

Overview
This is a backend API for a quiz application built using Node.js, Express.js, and MongoDB. The API allows users to create, participate in, and fetch details about quizzes. It includes functionalities for creating quizzes, retrieving active quizzes, fetching quiz results, and listing all quizzes.



Technologies  
-Node.js (version 16 or later)
-Express.js
-MongoDB with Mongoose for database interaction
-Node-Cron for scheduling tasks
-JWT for authentication


Installation


Configuration
Database: Ensure MongoDB is running and accessible using the provided connection string.
Server Port: Default is set to 9000, can be changed via the .env file


API Endpoints

for signup
username
password
http://localhost:9000/api/users/signup

for login
username
password
http://localhost:9000/api/users/login

Create a Quiz
Endpoint: POST /quizzes
http://localhost:9000/api/quizzes
Request Body:

json
Copy code
{
  "question": "What is the capital of France?",
  "options": ["Paris", "London", "Rome", "Berlin"],
  "rightAnswer": 0,
  "startDate": "2024-09-04T10:00:00.000Z",
  "endDate": "2024-09-04T12:00:00.000Z"
}
Response: 201 Created with the created quiz object.

Get Active Quiz
Endpoint: GET /quizzes/active
http://localhost:9000/api/quizzes/active
Response: 200 OK with the active quiz object or 404 Not Found if no active quiz is found.

Get Quiz Result
Endpoint: GET /quizzes/:id/result
http://localhost:9000/api/quizzes/66d88866d30cacdbd24bc799/active
Parameters: :id - The unique identifier of the quiz.
Response: 200 OK with the quiz result if the quiz has finished and the request is made after 5 minutes of the end time.

Get All Quizzes
http://localhost:9000/api/quizzes/all
Endpoint: GET /quizzes/all
Response: 200 OK with a list of all quizzes (active, inactive, and finished).



Cron Jobs
The application uses cron jobs to automatically update quiz statuses:
Active Status: Quizzes are updated to 'active' if the current time is within the startDate and endDate.
Finished Status: Quizzes are updated to 'finished' if the current time is past the endDate.
Cron jobs are scheduled to run every minute.

Authentication
JWT is used for secure access.
Ensure to include a valid JWT token in the Authorization header for protected routes.


Error Handling
The API provides appropriate HTTP status codes and error messages for different scenarios:

400 Bad Request for invalid requests.
404 Not Found for missing resources.
500 Internal Server Error for unexpected issues.


Deployment
https://quizz-application-xy5o.onrender.com/