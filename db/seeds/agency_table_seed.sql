CREATE TABLE agency (
id SERIAL PRIMARY KEY,
agency_name VARCHAR(50),
street_address VARCHAR(100),
city VARCHAR(50),
state_or_province VARCHAR(50),
zip INTEGER,
country VARCHAR(50),
phone_number VARCHAR(15),
url VARCHAR(75),
signup_date DATE
);