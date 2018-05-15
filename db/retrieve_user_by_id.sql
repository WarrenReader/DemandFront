SELECT 
users.id as user_id
, username
, first_name 
, last_name
, email
, position
, agency_id
FROM users
WHERE users.id = $1;