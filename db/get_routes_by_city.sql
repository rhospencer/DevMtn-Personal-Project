SELECT r.route_id, r.creator_id, r.route_img, r.zip, r.city, r.state, r.starting_address, r.distance, r.title, u.username, u.profile_pic FROM routes r
JOIN users u ON r.creator_id = u.user_id
WHERE r.city ILIKE $1
ORDER BY route_id DESC;