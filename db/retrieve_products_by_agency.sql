SELECT
name,
price,
date_created,
agency_employees.first_name AS first_name,
agency_employees.last_name AS last_name,
roadmaps_id,
products.id as products_id
FROM products
JOIN agency_employees ON products.agency_employees_id = agency_employees.id
WHERE products.agencies_id = $1;
