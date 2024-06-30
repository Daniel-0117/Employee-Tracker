INSERT INTO department (department_name)
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

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
  (1, "Mercer", "Frey", 1, NULL),   -- Mercer has no manager
  (2, "Balgruff", "Greater", 2, 1), -- Balgruff reports to Mercer
  (3, "Dagoth", "Ur", 3, 1),        -- Dagoth also reports to Mercer
  (4, "Sanguinus", "Bloodangel", 4, 1), -- Sanguinus reports to Mercer
  (5, "Horus", "Lunawolf", 5, NULL),   -- Horus has no manager
  (6, "Guiliman", "Robute", 6, 5),      -- Guiliman reports to Horus
  (7, "Lion", "Johnson", 7, 5),         -- Lion also reports to Horus
  (8, "Ferrus", "Manus", 8, 5),         -- Ferrus also reports to Horus
  (9, "Leman", "Russ", 9, NULL);        -- Leman has no manager
