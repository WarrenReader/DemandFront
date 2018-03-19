UPDATE products
SET
	name = $1
	, price = $2
WHERE id = $3;