CREATE TABLE IF NOT EXISTS users_sessions(
    id SERIAL,
    username VARCHAR(100),
    current_status TEXT,
    last_online TIMESTAMP
);
