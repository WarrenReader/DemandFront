CREATE TABLE products
(id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
price NUMERIC(7,2) NOT NULL,
date_created DATE NOT NULL,
agency_employees_id INTEGER NOT NULL REFERENCES agency_employees(id),
agencies_id INTEGER NOT NULL REFERENCES agencies(id),
roadmaps_id INTEGER NOT NULL REFERENCES roadmaps(id)
)