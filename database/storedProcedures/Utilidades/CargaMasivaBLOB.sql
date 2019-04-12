DROP PROCEDURE IF EXISTS utils_CargaMasivaBLOB;

DELIMITER $$
CREATE PROCEDURE utils_CargaMasivaBLOB
 (
  payload BLOB, -- en mysql, usar JSON; en mariaDB, usar BLOB
  callback VARCHAR(64)
  )
  NOT DETERMINISTIC
  MODIFIES SQL DATA
  COMMENT
  'Itera sobre un array y por cada elemento ejecuta el SP correspondiente'
  BEGIN
      DECLARE i INT UNSIGNED
          DEFAULT 0;
      DECLARE v_count INT UNSIGNED
          DEFAULT JSON_LENGTH(payload);
      DECLARE v_current_item BLOB
          DEFAULT NULL;

      WHILE i < v_count DO
          -- se obtiene el elemento
          -- y se le pasa al SP pasado como callback
          SET v_current_item :=
              JSON_EXTRACT(payload, CONCAT('$[', i, ']'));
          SET @sql_array_callback :=
              CONCAT('CALL ', callback, '(', v_current_item, ');');

          PREPARE stmt_array_callback FROM @sql_array_callback;
          EXECUTE stmt_array_callback;
          DEALLOCATE PREPARE stmt_array_callback;

          SET i := i + 1;
      END WHILE;
  END;
$$
DELIMITER;
