
USE ilot_software;


CREATE TABLE IF NOT EXISTS contacts (
    id INT NOT NULL AUTO_INCREMENT,
    dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    dealership_group VARCHAR(255) DEFAULT '',
    dealership_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);