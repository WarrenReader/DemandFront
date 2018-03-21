SELECT * FROM product_notes
JOIN agency_employees ON product_notes.agency_employees_id = agency_employees.id
WHERE product_notes.products_id = $1;