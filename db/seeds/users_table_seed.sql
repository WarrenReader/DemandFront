CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(50) UNIQUE NOT NULL,
password VARCHAR(100) NOT NULL,
agency_employee_id INTEGER NOT NULL REFERENCES agency_employee(id)
);