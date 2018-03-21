CREATE TABLE product_notes
(id SERIAL PRIMARY KEY,
created_on DATE NOT NULL,
note VARCHAR(1000) NOT NULL,
products_id INTEGER NOT NULL REFERENCES products(id),
agency_employees_id INTEGER NOT NULL REFERENCES agency_employees(id)
);