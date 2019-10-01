INSERT INTO users (username, city, state, zip, profile_pic)
VALUES 
    ($1, $2, $3, $4, $5)
RETURNING user_id;