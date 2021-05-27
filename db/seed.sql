USE employees_db; 

INSERT INTO department(name)
VALUES('Nursing'), 
('Therapy'), 
('Dietary'), 
('Housekeeping'), 
('Maintenance'), 
('Business_Office'), 
('Social_Services'), 
('Activities')
('Administration'); 

INSERT INTO role(title, salary, department_id)
VALUES('Unit_Manager', 60,000, 1), 
('Physical_Therapist', 70,000, 2), 
('Senior_Dietary_Manager', 55,000,3 ), 
('second_shift_housekeeper', 20,000,4), 
('Lead_Maintenance', 50,000, 5), 
('pay_roll_specialist', 45,000, 6), 
('Licensed_Social_Worker', 60,000, 7), 
('Activities_Assistant', 20,000,8 ), 
('Administrator', 80,000,9 ); 

INSERT INTO employee(first_name, last_name, {role_id}, {manager_id})
VALUES('Anita', 'Penn', 1, 1), 
('Hevee', 'Waits', 2, 1), 
('Sherry', 'Baker', 3, 1), 
('Seymour', 'Butts', 4, 1), 
('Iman', 'Azole', 5, 1), 
('Geraldine', 'Cash', 6, 1) 
('Kaitlyn', 'Ball', 8, 5, 1),
('Christopher', 'Rice', 9, NULL); 
