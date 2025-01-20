
# MusixMatch API Integration Application

## Project Description

This project is a server-client application that integrates with the MusixMatch API. The application allows users to register and log in, view the top charting artists for their country, browse the last three released albums of these artists, and view lyrics for the songs included in those albums.

The application is designed to be user-friendly, responsive, and scalable, using modern web development technologies.

## Features

### Frontend

User Registration and Login with validation.

Display of top charting artists based on the user's country.

View the last 3 released albums for each artist.

Display song lyrics for tracks in a selected album.

### Backend

Secure user authentication using JWT.

Integration with the MusixMatch API for fetching artists, albums, and lyrics.

RESTful API for communication between the frontend and backend.

Middleware for protected routes to ensure secure access.

## Technologies Used

### Frontend

React.js: For building the user interface.

React-Bootstrap: For responsive and user-friendly design.

React Router: For routing and navigation.

Axios: For making API requests.

### Backend

Node.js: For building the server.

Express.js: For creating RESTful API endpoints.

MongoDB: As the database for storing user data.

JWT: For secure user authentication.

bcrypt.js: For password hashing.

## APIs and Libraries

MusixMatch API: For fetching music data (artists, albums, lyrics).

## Backend Setup

Clone the repository and navigate to the backend folder.

Install dependencies:

``` npm install ```

Create a .env file and add the following:

``` 
MONGO_URI=<Your MongoDB URI>
MUSIXMATCH_API_KEY=<Your MusixMatch API Key>
JWT_SECRET=<Your Secret Key> 
```

Start the backend server:

```
npm start
```
## Frontend Setup

Navigate to the frontend folder.

Install dependencies:

``` npm install ```

Start the frontend development server:

``` npm start ```


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

