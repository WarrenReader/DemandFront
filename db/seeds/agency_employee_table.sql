CREATE TABLE agency_employee (
id SERIAL PRIMARY KEY,
first_name VARCHAR(50),
last_name VARCHAR(50),
email VARCHAR(75) UNIQUE,
phone VARCHAR(20),
position VARCHAR(50),
primary_contact VARCHAR(5),
agency_id INTEGER REFERENCES agency(id)
)