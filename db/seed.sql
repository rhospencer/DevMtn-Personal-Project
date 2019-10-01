DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS login;
DROP TABLE IF EXISTS routes;
DROP TABLE IF EXISTS user_saved_routes;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip INT
);

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
    starting_address TEXT
);

CREATE TABLE user_saved_routes (
    save_id SERIAL PRIMARY KEY,
    route_id INT REFERENCES routes(route_id),
    saved_by INT REFERENCES users(user_id)
);
