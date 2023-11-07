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

const multiMenu = () => {
// prompt user with list of options
    inquirer
      .prompt({
        type: "list",
        name: "option",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      })
      .then((answer) => {
// user choice based on the selected option
        switch (answer.option) {
          case "View All Employees":
            viewTable("employee");
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "Update Employee Role":
            updateEmployeeRole();
            break;
          case "View All Roles":
            viewTable("role");
            break;
          case "Add Role":
            addRole();
            break;
          case "View All Departments":
            viewTable("department");
            break;
          case "Add Department":
            addDepartment();
            break;
          case "Quit":
            console.log("Goodbye");
            db.end(); 
            break;
          default:
            console.log("Invalid Input");
            multiMenu();
            break;
        }
      });
};
  
// view data from table
  const viewTable = (table) => {
    db.query(`SELECT * FROM ${table}`, (err, res) => {
      if (err) throw err;
      console.table(res);
      multiMenu(); 
    });
};
  
// add a new employee
  const addEmployee = () => {
    const questions = [
      {
        name: "first_name",
        type: "input",
        message: "Employee's first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "Employee's last name?",
      },
      {
        name: "role_id",
        type: "input",
        message: "Employee's role id?",
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is the manager Id? (leave empty for NULL)",
      },
    ];
  
    inquirer.prompt(questions).then((answers) => {
      const managerId = answers.manager_id || null;
  
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answers.first_name, answers.last_name, answers.role_id, managerId],
        (err, res) => {
          if (err) throw err;
          console.log("Employee added successfully!");
          multiMenu(); 
        }
      );
    });
};
  
// add a new role
  const addRole = () => {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Title of the role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the position salary?",
        },
        {
          name: "department_id",
          type: "input",
          message: "What is the department ID?",
        },
      ])
      .then((answers) => {
        const departmentID = answers.department_id || null;
  
        db.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [answers.title, answers.salary, departmentID],
          (err, res) => {
            if (err) throw err;
            console.log("Role added successfully");
            multiMenu(); 
          }
        );
      });
};
  
// update an employee role
  const updateEmployeeRole = () => {
    const questions = [
      {
        name: "id",
        type: "input",
        message: "Enter the employee's id",
      },
      {
        name: "newRoleId",
        type: "input",
        message: "Enter the new role id",
      },
    ];
    inquirer.prompt(questions).then((answers) => {
      db.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [answers.newRoleId, answers.id],
        (err, res) => {
          if (err) throw err;
          console.log("Employee successfully updated");
          multiMenu(); 
        }
      );
    });
};
  
// add a new department
  const addDepartment = () => {
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "Name of the department?",
        },
      ])
      .then((answers) => {
        db.query(
          "INSERT INTO department (name) VALUES (?)",
          [answers.name],
          (err, res) => {
            if (err) throw err;
            console.log("Department added successfully");
            multiMenu(); 
          }
        );
      });
};
  
