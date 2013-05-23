CREATE TABLE requests (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    contact VARCHAR(32) NOT NULL,
    instructions TEXT NOT NULL,
    created_on TIMESTAMP default CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
