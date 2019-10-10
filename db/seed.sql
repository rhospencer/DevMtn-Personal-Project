DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS login;
DROP TABLE IF EXISTS routes;
DROP TABLE IF EXISTS user_saved_routes;
DROP TABLE IF EXISTS plans;

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
    distance DECIMAL(4, 2),
    title VARCHAR(100),
    description TEXT
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

CREATE TABLE plans (
    plan_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    start_date DATE,
    end_date DATE,
    week_focus TEXT,
    m_distance DECIMAL(4, 2),
    m_type VARCHAR(100),
    m_description TEXT,
    m_route INT REFERENCES routes(route_id),
    tu_distance DECIMAL(4, 2),
    tu_type VARCHAR(100),
    tu_description TEXT,
    tu_route INT REFERENCES routes(route_id),
    w_distance DECIMAL(4, 2),
    w_type VARCHAR(100),
    w_description TEXT,
    w_route INT REFERENCES routes(route_id),
    th_distance DECIMAL(4, 2),
    th_type VARCHAR(100),
    th_description TEXT,
    th_route INT REFERENCES routes(route_id),
    f_distance DECIMAL(4, 2),
    f_type VARCHAR(100),
    f_description TEXT,
    f_route INT REFERENCES routes(route_id),
    sa_distance DECIMAL(4, 2),
    sa_type VARCHAR(100),
    sa_description TEXT,
    sa_route INT REFERENCES routes(route_id),
    su_distance DECIMAL(4, 2),
    su_type VARCHAR(100),
    su_description TEXT,
    su_route INT REFERENCES routes(route_id)
);

INSERT INTO plans (user_id, start_date, end_date, week_focus, m_distance, m_type, m_description, m_route, tu_distance, tu_type, tu_description, tu_route, w_distance, w_type, w_description, w_route, th_distance, th_type, th_description, th_route, f_distance, f_type, f_description, f_route, sa_distance, sa_type, sa_description, sa_route, su_distance, su_type, su_description, su_route)
VALUES
    (1, null, null, null, 1, '', '', null, 2, '', '', null, 3, '', '', null, 4, '', '', null, 5, '', '', null, 6, '', '', null, 7, '', '', null);
