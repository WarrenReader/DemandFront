SELECT
roadmaps.id as roadmaps_id,
name,
description,
tasks,
last_update,
first_name,
last_name,
roadmaps.agencies_id
FROM roadmaps
JOIN agency_employees ON roadmaps.agency_employees_id = agency_employees.id
WHERE roadmaps.agencies_id = $1;