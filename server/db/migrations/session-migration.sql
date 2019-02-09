CREATE TABLE IF NOT EXISTS users_sessions(
    id SERIAL,
    username VARCHAR(100),
    last_online DATE,
    current_status VARCHAR(50)
);
