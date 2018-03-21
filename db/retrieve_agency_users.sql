SELECT 
username
, first_name 
, last_name
, email
, phone
, position
, agency_employees_id
FROM users
JOIN agency_employees ON users.agency_employees_id = agency_employees.id
WHERE agency_employees.agencies_id = $1;