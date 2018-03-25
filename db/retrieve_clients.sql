SELECT
clients.name as client_name,
products.name as product_name,
client_products.price,
clients.url,
clients.id,
clients.sign_up_date
FROM clients
JOIN client_products ON clients.id = client_products.clients_id
JOIN products ON client_products.products_id = products.id
WHERE clients.agencies_id = $1;

