
USE ilot_software;


CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    dealership_group TEXT DEFAULT '',
    dealership_name TEXT NOT NULL,
    position TEXT NOT NULL,
    message TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created DATETIME NOT NULL,
    updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    slug VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255) NOT NULL,
    image_urls VARCHAR(255) NOT NULL DEFAULT "",
);