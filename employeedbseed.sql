DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT NULL
);

INSERT INTO department (id, name)
VALUES (1, "Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (1,"Senior Sales",100000,1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2,"Junior Sales",60000,1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3,"Tech Lead",100000,2);

INSERT INTO role (id, title, salary, department_id)
VALUES (4,"Software Engineer",80000,2);

INSERT INTO role (id, title, salary, department_id)
VALUES (5,"Financial Advisor",100000,3);

INSERT INTO role (id, title, salary, department_id)
VALUES (6,"Accountant",80000,3);

INSERT INTO role (id, title, salary, department_id)
VALUES (7,"Senior Attorney",100000,4);

INSERT INTO role (id, title, salary, department_id)
VALUES (8,"Associate Attorney",80000,4);

-- EMPLOYEES
INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (1,"Edmond","Harrington",1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2,"Scott","McConnell",2,1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3,"Emily","Miller",2,1);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (4,"Lino","Bouchard",3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5,"William","Darnell",4,4);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (6,"Joseph","Bingham",5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7,"Courtney","Davis",6,6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8,"Michael","Casey",6,6);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (9,"Liza","Solis",7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10,"Travis","Johnson",8,9);





