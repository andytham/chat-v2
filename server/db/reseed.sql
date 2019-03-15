
DROP TABLE  IF EXISTS  chat_history CASCADE;
\! pwd
\i 'server/db/migrations/history-migration.sql'
\i 'server/db/seeds/history-seed.sql'

DROP TABLE IF EXISTS users_sessions CASCADE;
\i 'server/db/migrations/session-migration.sql'

DROP TABLE IF EXISTS users CASCADE;
\i 'server/db/migrations/user-migration.sql'
\i 'server/db/seeds/users-seed.sql'
\i 'server/db/seeds/dummy-sessions.sql'