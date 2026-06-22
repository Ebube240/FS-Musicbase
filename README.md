A full-stack web application for managing artists, albums, and songs using a RESTful API and a SQLite database.

## Description

The Full-Stack Music Library Application is designed to demonstrate the integration of a frontend client with a Node.js and Express backend connected to a SQLite database. The application allows users to perform Create, Read, Update, and Delete (CRUD) operations on artists, albums, and songs through an interactive HTML, CSS, and JavaScript interface.

The project follows a standard full-stack architecture where the frontend communicates with the backend using the Fetch API, the backend processes requests through RESTful endpoints, and all data is stored persistently in a SQLite database. Relationships between artists, albums, and songs are maintained using foreign keys with cascading deletes to preserve database integrity.

## Getting Started

### Dependencies

Before running the project, ensure the following are installed:

* Windows 10 or later (or any operating system with Node.js support)
* Node.js
* npm (included with Node.js)
* Express.js
* SQLite3
* CORS

Required npm packages:

```bash
npm install express sqlite3 cors
```

### Installing

1. Download or clone the project repository.

```bash
git clone <repository-url>
```

2. Navigate to the backend directory.

```bash
cd backend
```

3. Install the required dependencies.

```bash
npm install
```

4. Ensure the project contains the following folders:

```
backend/
├── controllers/
├── routes/
├── data/
├── db.js
├── model.sql
└── server.js

frontend/
├── css/
├── js/
├── index.html
├── artists.html
├── albums.html
└── songs.html
```

No additional file modifications are required.

### Executing Program

1. Open a terminal in the backend folder.

2. Start the Express server.

```bash
node server.js
```

3. Open the frontend using a local web server such as VS Code Live Server.

4. Navigate through the application using the navigation bar to manage artists, albums, and songs.

The backend will run on:

```
http://localhost:5000
```

The frontend communicates with the backend using the Fetch API.

## Help

### Common Issues

**"Cannot GET /"**

This is expected behaviour when navigating to `http://localhost:5000/`. The backend exposes the following endpoints instead:

```
http://localhost:5000/artists
http://localhost:5000/albums
http://localhost:5000/songs
```

**Failed to fetch**

* Ensure the backend server is running.
* Verify that the frontend is connecting to `http://localhost:5000`.
* Confirm that all dependencies have been installed.

**Database not updating**

Restart the backend server:

```bash
node server.js
```

## Authors

Ebube

GitHub: @Ebube240
