SELECT
products.name as product_name,
client_products.date_created,
client_products.price,
roadmaps.name as roadmap
FROM client_products
JOIN products ON client_products.products_id = products.id
JOIN roadmaps ON products.roadmaps_id = roadmaps.id
WHERE client_products.clients_id = $1;