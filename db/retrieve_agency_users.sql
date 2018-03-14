SELECT 
username
, first_name 
, last_name
, email
FROM users
JOIN agency_employee ON users.agency_employee_id=agency_employee.id
WHERE agency_employee.agency_id = $1;