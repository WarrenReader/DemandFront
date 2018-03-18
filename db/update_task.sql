UPDATE tasks
SET
name = $1,
description = $2,
estimated_cost = $3,
last_update = $4,
last_update_by_agency_employee_id = $5
WHERE id = $6
RETURNING *;