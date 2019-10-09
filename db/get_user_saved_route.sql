SELECT * FROM user_saved_routes
WHERE saved_by = $1 AND route_id = $2;