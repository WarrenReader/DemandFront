UPDATE users
SET
username = $2
WHERE agency_employees_id = $1;

UPDATE agency_employees
SET 
	first_name = $3
	, last_name = $4
	, email = $5
	, phone = $6
	, position = $7
WHERE id = $1;