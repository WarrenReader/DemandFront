CREATE TABLE roadmaps
(id SERIAL PRIMARY KEY,
name VARCHAR(50),
tasks INTEGER[], 
agency_employee_id INTEGER REFERENCES agency_employee(id),
agency_id INTEGER REFERENCES agency(id),
created DATE
)