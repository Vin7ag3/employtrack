-- insert dept w/ specified names
INSERT INTO department (name) VALUES ('Design'), ('Development');

-- insert role titles, salaries, and dpt id
INSERT INTO role (title, salary, department_id) VALUES
  ('Lead Designer', 100000, 1),
  ('Designer', 70000, 1),
  ('Lead Developer', 130000, 2),
  ('Developer', 100000, 2);

-- insert employee first, last, role id, and manager id.
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Sola', 'Yu', 1, NULL),
  ('Veasnar', 'Poe', 3, NULL),
  ('Carlos', 'Cardona', 4, 2),
  ('Doug', 'Jewel', 2, 1),
  ('Kotori', 'Haibara', 2, 1),
  ('Shohei', 'Kenei', 4, 2);

