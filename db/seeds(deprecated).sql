INSERT INTO employees (first_name, last_name)
VALUES  ('jon', 'smith'),
        ('light', 'yagami'),
        ('lucy', 'heartfelia'),
        ('rimiru', 'tempest'),
        ('miya', 'yotsuba'),
        ('naruto', 'uzumaki'),
        ('monkey', 'd. luffy'),
        ('hingle', 'mcCringleberry');

INSERT INTO employee_details (employee_id, department, company_role, salary, manager)
VALUES  (1, 'transportation', 'train security', 150000, 'Gamma'),
        (2, 'food', 'chip eater', 6700, 'Ryuk'),
        (3, 'exploration', 'key collector', 33331, 'Natsu'),
        (4, 'exploration', 'other world investigator', 100000, 'Shion'),
        (5, 'management', 'military advisor', 56000000, 'No one'),
        (6, 'food', 'ramen eater', 5, 'Kakashi'),
        (7, 'transportation', 'pirate captian', 4000000, 'Himself'),
        (8, 'management', 'little league baseball coach', 10003, 'Javaris Jamar Javarison-Lamar');

INSERT INTO roles (company_role, salary)
VALUES  ('train security', 150000),
        ('chip eater', 6700),
        ('key collector', 33331),
        ('other world investigator', 100000),
        ('military advisor', 56000000),
        ('ramen eater', 5),
        ('pirate captian', 4000000),
        ('little league baseball coach', 10003);

INSERT INTO departments (department)
VALUES  ('transportation'),
        ('food'),
        ('exploration'),
        ('exploration'),
        ('management'),
        ('food'),
        ('transportation'),
        ('management');