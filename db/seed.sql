DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS login;
DROP TABLE IF EXISTS routes;
DROP TABLE IF EXISTS user_saved_routes;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip INT,
    profile_pic TEXT
);

INSERT INTO users (username, city, state, zip, profile_pic)
VALUES 
    ('rhoSpencer', 'St. George', 'UT', 84790);


CREATE TABLE login (
    user_login_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    hash TEXT
);

CREATE TABLE routes (
    route_id SERIAL PRIMARY KEY,
    creator_id INT REFERENCES users(user_id),
    route_img TEXT,
    zip INT,
    city VARCHAR(50),
    state VARCHAR(2),
    starting_address TEXT,
    distance DECIMAL(4, 2)
);

INSERT INTO routes (creator_id, route_img, zip, city, state, starting_address, distance)
VALUES
    (1, 'https://d2u2bkuhdva5j0.cloudfront.net/activities-v2/2/233x130.jpg@2x?request=dHJ1ZSAxNjgwNjYwMjU0&signature=dc125ac0ddb5d572500d5914398ef6b6765b8f0f5f8fcc56beb2aea57ceeaa9b&activityVersion=45a0170', 84790, 'St. George', 'UT', '3505 Barcelona Dr, St. George, UT 84790', 14.71);

CREATE TABLE user_saved_routes (
    save_id SERIAL PRIMARY KEY,
    route_id INT REFERENCES routes(route_id),
    saved_by INT REFERENCES users(user_id)
);

INSERT INTO user_saved_routes (route_id, saved_by)
VALUES
    (1, 1);
