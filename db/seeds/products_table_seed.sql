CREATE TABLE products
(id SERIAL PRIMARY KEY
, name VARCHAR(50)
, price NUMERIC(7,2)
, created_on DATE
, agency_id INTEGER REFERENCES agency(id)
, agency_employee_id INTEGER REFERENCES agency_employee(id)
, roadmap_id INTEGER
)