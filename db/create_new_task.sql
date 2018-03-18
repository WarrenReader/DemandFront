INSERT INTO tasks
(name
, description
, estimated_cost
, date_created
, agency_employee_id
, agency_id
, last_update
, last_update_by_agency_employee_id)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8)
