DROP PROCEDURE IF EXISTS `pos_CargaMasivaPuntoVenta`;

DELIMITER $$
CREATE PROCEDURE pos_CargaMasivaPuntoVenta
  ( payload BLOB )
  NOT DETERMINISTIC
  MODIFIES SQL DATA
  COMMENT
  'Itera sobre un array y por cada elemento ejecuta el SP correspondiente'
  BEGIN

    DECLARE i INT UNSIGNED
        DEFAULT 0;
    DECLARE v_count INT UNSIGNED
        DEFAULT JSON_LENGTH(payload);

    TRUNCATE tmp_PvPuntoDeVenta;

    WHILE i < v_count DO

      SET @codigo = JSON_UNQUOTE(JSON_EXTRACT(payload, CONCAT('$[', i, '].codigo')));
      SET @retail = JSON_UNQUOTE(JSON_EXTRACT(payload, CONCAT('$[', i, '].retail')));
      SET @nombre = JSON_UNQUOTE(JSON_EXTRACT(payload, CONCAT('$[', i, '].nombre')));
      SET @direccion = JSON_UNQUOTE(JSON_EXTRACT(payload, CONCAT('$[', i, '].direccion')));

      INSERT INTO tmp_PvPuntoDeVenta(codigo, retail, nombre, direccion)
      VALUES (@codigo, @retail, @nombre, @direccion);

      SET i := i + 1;
    END WHILE;

    CALL pos_CargaPuntoVenta();

    select * from tmp_PvPuntoDeVenta;

  END;
$$
DELIMITER;
