# contact-app-Flask-React
a simple CRUD web application that lets you store, edit or delete Email contacts. built using Python (Flask) + Javascript (React) with SQLite as DB.  goal is to run Backend and Frontend as seperated Docker containers using Docker config files and Dcker compose.

before usage:

1. install the docker engine
2. install docker compose
3. install python + pip
4. install npm

Usage:

1. clone and downlaod the repo
2. cd into app's directory
3. 
  3.1 docker-compose down (if you have a project running)
  3.2 docker-compose build --no-cache
  3.3 docker-compose up
4. let the docker built and serve the app
5. visit the given local host address (use the port given)
  ex: http://localhost:5000

the backend will give you logging info in the terminal as you create, edit or delete content.

in order to disable the web-app, simply exit the cli and/or bring down the container.

have fun!
