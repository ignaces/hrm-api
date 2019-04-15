DROP PROCEDURE IF EXISTS pos_ObtenerPersonasPuntoVenta;

DELIMITER $$
CREATE PROCEDURE `pos_ObtenerPersonasPuntoVenta`
  ( p_id VARCHAR(45),
    p_orderby VARCHAR(45),
    IN offsets INT,
    IN limits INT
  )
  BEGIN
    SET @limit_sp = CONCAT(' LIMIT ', offsets , ',', limits);
    SET @query = CONCAT( 'SELECT * FROM PvPersonaPuntoDeVenta WHERE idPvPuntoDeVenta ="', p_id ,'" ORDER BY ', p_orderby ,' desc');
    SET @query = CONCAT(@query, @limit_sp);

    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
  END;
$$
DELIMITER;
