SELECT *, client_products.price as client_spend, clients.id as client_id FROM client_products
JOIN clients ON client_products.client_id = clients.id
JOIN products ON client_products.product_id = products.id
WHERE client_products.agency_id = $1;