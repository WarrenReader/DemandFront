SELECT
tasks.id AS tasks_id,
name,
description,
cost,
last_update,
first_name,
last_name
FROM tasks
JOIN agency_employees ON tasks.last_update_agency_employees_id = agency_employees.id
WHERE tasks.agencies_id = $1;

