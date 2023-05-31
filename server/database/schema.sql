
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
