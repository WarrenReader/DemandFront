SELECT *, roadmaps.id as roadmap_id FROM roadmaps

JOIN agency_employee ON roadmaps.agency_employee_id = agency_employee.id
WHERE roadmaps.agency_id = $1;