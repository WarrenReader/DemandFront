SELECT
tasks.id AS task_id,
name,
description,
cost,
last_update,
first_name,
last_name
FROM tasks
JOIN users ON tasks.last_update_user_id = users.id
WHERE tasks.agency_id = $1;