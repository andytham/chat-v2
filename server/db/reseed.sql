
DROP TABLE  IF EXISTS  chat_history CASCADE;
\! pwd
\i 'server/db/migrations/history-migration.sql'
\i 'server/db/seeds/history-seed.sql'

DROP TABLE IF EXISTS users_sessions CASCADE;
\i 'server/db/seeds/session-migration'