UPDATE clients
SET
name = $1,
url = $2, 
phone = $3,
street_address = $4,
city = $5,
state_province = $6,
zip = $7,
country = $8
WHERE id = $9;