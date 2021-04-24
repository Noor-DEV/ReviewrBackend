CREATE TABLE rests(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK(price_range BETWEEN 1 AND 5)
);
CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    rest_id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating BETWEEN 1 AND 5),
    FOREIGN KEY(rest_id) REFERENCES rests(id)
);