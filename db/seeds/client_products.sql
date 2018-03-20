CREATE TABLE client_products
(id SERIAL PRIMARY KEY,
clients_id INTEGER NOT NULL REFERENCES clients(id),
products_id INTEGER NOT NULL REFERENCES products(id),
agencies_id INTEGER NOT NULL REFERENCES agencies(id),
price NUMERIC(7,2) NOT NULL,
date_created DATE NOT NULL
)