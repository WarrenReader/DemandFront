SELECT
clients.id AS client_id,
clients.name AS client_name,
clients.street_address,
clients.city,
clients.state_province,
clients.zip,
clients.country,
clients.phone,
clients.url,
clients.sign_up_date,
products.name,
client_products.price,
client_products.date_created AS product_added
FROM clients
JOIN client_products on clients.id = client_products.clients_id
JOIN products on client_products.products_id = products.id
WHERE clients.id = $1;