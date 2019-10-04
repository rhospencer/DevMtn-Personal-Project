SELECT r.route_id, r.creator_id, r.route_img, r.zip, r.city, r.state, r.starting_address, r.distance, r.title, r.description, u.username, u.profile_pic FROM routes r
JOIN user_saved_routes usr ON r.route_id = usr.route_id
JOIN users u ON r.creator_id = u.user_id
WHERE r.creator_id = $1 AND usr.saved_by = $1 AND r.city ILIKE $2 AND distance BETWEEN ($3-5) AND ($3+5)
ORDER BY r.route_id DESC;