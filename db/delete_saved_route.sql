DELETE FROM user_saved_routes
WHERE route_id = $1 AND saved_by = $2;