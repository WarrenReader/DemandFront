DELETE FROM users
WHERE agency_employees_id = $1;

DELETE FROM agency_employees
WHERE id = $1;