/* Replace with your SQL commands */
CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);