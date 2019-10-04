INSERT INTO routes (creator_id, route_img, zip, city, state, starting_address, distance, title, description)
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING route_id;