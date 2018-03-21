UPDATE tasks
SET
name = $1,
description = $2,
cost = $3,
last_update = $4,
last_update_agency_employees_id = $5
WHERE id = $6;