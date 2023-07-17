INSERT INTO department (name)
VALUES ("Legal"),
       ("Finance"),
       ("Cleaning"),
       ("Medical");

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Lead", 120000, 1),
       ("Lawyer", 100000, 1),
       ("Head Accountant", 95000, 2),
       ("Accountant", 80000, 2),
       ("Janitorial Lead", 65000, 3),
       ("Janitor", 45000, 3),
       ("Medial Lead", 500000, 4),
       ("Doctor", 250000, 4),
       ("Nurse", 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mercer", "Frey", 1, 1),
       ("Balgruff", "Greater", 2, 0),
       ("Dagoth", "Ur", 3, 1),
       ("Sanguinus", "Bloodangel", 4, 0),
       ("Horus", "Lunawolf", 5, 1),
       ("Guiliman", "Robute", 6, 0),
       ("Lion", "Johnson", 7, 1),
       ("Ferrus", "Manus", 8, 0),
       ("Leman", "Russ", 9, 0);