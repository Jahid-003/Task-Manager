# Task-Manager README.md
# Skeddule - Your Personal Task Companion

Skeddule is a powerful task management tool designed for simplicity, helping you organize your tasks effortlessly. From task creation to priority management, status updates, and robust search functionality, Skeddule streamlines your workflow, making every task count.

## Getting Started

Follow these steps to set up and run the Skeddule project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [MySQL Workbench](https://www.mysql.com/products/workbench/) installed

### Installation

1. Open a terminal and navigate to the root of the project folder.
2. Run the following command to install project dependencies:
   npm install or npm i


### Database Setup
1. In MySQL Workbench, create a new database named skeddule.
2. Open the Sequelize configuration file (config/config.json) and update the database credentials as per your MySQL setup.

### Synchronize Database
Uncomment the db.sync code at the end of the app.js file. This step ensures that Sequelize synchronizes the defined models with the database schema.

### Running the Application
1. Run the application using the following command:
    node app.js
2. Access the Skeddule dashboard by navigating to http://localhost:3000 in your web browser.

### Usage
Register or log in to your personalized dashboard.
Add, edit, delete, and view tasks seamlessly.
Manage task priorities and update status from 'todo' to 'in progress' and 'completed.'
Utilize the robust search functionality to quickly find tasks.