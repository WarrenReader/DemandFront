SELECT 
users.id as user_id
, username
, agency_employees.id as agency_employees_id
, agency_employees.agencies_id as agencies_id
, first_name 
, last_name
, email
, phone
, position
FROM users
JOIN agency_employees ON users.agency_employees_id = agency_employees.id
WHERE users.id = $1;