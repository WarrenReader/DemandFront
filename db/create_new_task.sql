INSERT INTO tasks
(name
, description
, cost
, date_created
, agency_employees_id
, agencies_id
, last_update
, last_update_agency_employees_id)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8)
