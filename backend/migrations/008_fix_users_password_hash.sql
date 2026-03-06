-- Fix users table - add password_hash column
-- Using stored procedure to handle conditional column addition
DELIMITER $$
CREATE PROCEDURE AddColumnIfNotExists()
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE() 
    AND TABLE_NAME = 'users' 
    AND COLUMN_NAME = 'password_hash'
  ) THEN
    ALTER TABLE users ADD COLUMN password_hash VARCHAR(255) NOT NULL DEFAULT '';
  END IF;
END$$
DELIMITER ;

CALL AddColumnIfNotExists();
DROP PROCEDURE IF EXISTS AddColumnIfNotExists;
