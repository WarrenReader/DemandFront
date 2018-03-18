Select *, tasks.id as task_id FROM tasks
JOIN agency_employee ON tasks.agency_employee_id = agency_employee.id
WHERE agency_employee.id = $1;
