CREATE TABLE agency_employees (
id SERIAL PRIMARY KEY,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
email VARCHAR(75) NOT NULL UNIQUE,
phone VARCHAR(20),
position VARCHAR(50),
agencies_id INTEGER NOT NULL REFERENCES agencies(id)
)