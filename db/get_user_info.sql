SELECT user_id, username, city, state, zip, profile_pic FROM users
WHERE user_id = $1;