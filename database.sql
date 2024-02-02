
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20)
);

/* new updated table*/
CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20)
);