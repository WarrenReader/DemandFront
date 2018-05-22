UPDATE users
SET
  first_name = $1
  , last_name = $2
  , email = $3
  , position = $4
WHERE id = $5