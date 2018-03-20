CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
description VARCHAR(1000) NOT NULL,
cost NUMERIC(7,2) NOT NULL,
date_created DATE NOT NULL,
agency_employees_id INTEGER NOT NULL REFERENCES agency_employees.id,
agencies_id INTEGER NOT NULL REFERENCES agencies(id),
last_update DATE NOT NULL,
agency_employees_id_last_update INTEGER NOT NULL REFERENCES agency_employees.id
)