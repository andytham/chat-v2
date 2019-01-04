CREATE TABLE IF NOT EXISTS chat_history(
    id SERIAL,
    usr VARCHAR(100),
    msg TEXT,
    tme VARCHAR(50)
);
