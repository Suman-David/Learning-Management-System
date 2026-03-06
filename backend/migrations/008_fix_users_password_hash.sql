-- Fix users table - add password_hash column if missing
-- Check if column exists first, then add if not
SET @dbname = DATABASE();
SET @tablename = 'users';
SET @columnname = 'password_hash';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = @dbname
    AND TABLE_NAME = @tablename
    AND COLUMN_NAME = @columnname
  ) > 0,
  'SELECT 1;',
  'ALTER TABLE users ADD COLUMN password_hash VARCHAR(255) NOT NULL DEFAULT "";'
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;
