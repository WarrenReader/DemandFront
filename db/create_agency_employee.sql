INSERT INTO agency_employee
(first_name, last_name, email, phone, position, agency_id)
VALUES
($1, $2, $3, $4, $5, $6)
RETURNING *;