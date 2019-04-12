DROP PROCEDURE IF EXISTS pos_ObtenerMultiplesPuntoVenta;

DELIMITER $$
CREATE PROCEDURE `pos_ObtenerMultiplesPuntoVenta`
  ( p_orderby VARCHAR(45),
    IN offsets INT,
    IN limits INT
  )
  BEGIN
    SET @limit_sp = CONCAT(' LIMIT ', offsets , ',', limits);
    SET @query = CONCAT( "SELECT * FROM PvPuntoDeVenta ORDER BY ", p_orderby ," desc");
    SET @query = CONCAT(@query, @limit_sp);

    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
  END;
$$
DELIMITER;
