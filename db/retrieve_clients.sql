SELECT
clients.name AS client_name,
products.name AS product_name,
client_products.price,
clients.url,
clients.id AS clients_id,
clients.sign_up_date
FROM clients
JOIN client_products ON clients.id = client_products.clients_id
JOIN products ON client_products.products_id = products.id
WHERE clients.agencies_id = $1;