INSERT INTO agency_employees
(first_name, last_name, email, phone, position, agencies_id)
VALUES
($1, $2, $3, $4, $5, $6)
RETURNING *;