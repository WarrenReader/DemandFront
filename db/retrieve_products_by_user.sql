SELECT *, products.id as product_id FROM products
JOIN agency_employee ON products.agency_employee_id = agency_employee.id
WHERE products.agency_employee_id = $1;
