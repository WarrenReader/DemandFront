CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(30) NOT NULL UNIQUE,
password VARCHAR(100) NOT NULL,
agency_employees_id INTEGER NOT NULL REFERENCES agency_employees(id)
);