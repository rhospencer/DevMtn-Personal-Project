UPDATE routes
SET 
    route_img = $2,
    zip = $3,
    city = $4,
    state = $5,
    starting_address = $6,
    distance = $7,
    title = $8,
    description = $9
WHERE route_id = $1;