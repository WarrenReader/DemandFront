CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
description VARCHAR(1000) NOT NULL,
cost NUMERIC(7,2) NOT NULL,
date_created DATE NOT NULL,
created_by_user_id INTEGER NOT NULL REFERENCES users.id,
agency_id INTEGER NOT NULL REFERENCES agencies(id),
last_update DATE NOT NULL,
last_update_user_id INTEGER NOT NULL REFERENCES users.id
)