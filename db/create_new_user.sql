INSERT INTO users
(username, password, agency_employee_id)
VALUES
($1, $2, $3)
RETURNING *;