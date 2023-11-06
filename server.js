// import required mod
const inquirer = require("inquirer");
const mysql = require("mysql2");
const dotenv = require("dotenv");

// environment var from .env file
dotenv.config();

// connection to the mysql database
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,        
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,     
});

// connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database.");
  multiMenu();
});

