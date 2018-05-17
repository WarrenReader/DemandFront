SELECT
name,
price,
date_created,
users.first_name AS first_name,
users.last_name AS last_name,
roadmap_id,
products.id as product_id
FROM products
JOIN users ON products.user_id = users.id
WHERE products.agency_id = 1;
