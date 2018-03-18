CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
name VARCHAR(50),
description VARCHAR(1000),
estimated_cost NUMERIC(7,2),
date_created DATE,
agency_employee_id INTEGER NOT NULL REFERENCES agency_employee(id),
agency_id INTEGER NOT NULL REFERENCES agency(id),
last_update DATE,
last_update_by_agency_employee_id INTEGER NOT NULL REFERENCES agency_employee(id)
)