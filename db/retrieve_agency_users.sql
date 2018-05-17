SELECT 
username
, first_name 
, last_name
, email
, position
FROM users
WHERE agency_id = $1;
