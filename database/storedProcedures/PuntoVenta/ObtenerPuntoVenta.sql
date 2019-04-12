DROP PROCEDURE IF EXISTS `pos_ObtenerPuntoVenta`;

DELIMITER $$
CREATE PROCEDURE `pos_ObtenerPuntoVenta`
  (
    p_id varchar(200)
  )
  BEGIN
    select * from PvPuntoDeVenta where id=p_id;

  END;
$$
DELIMITER;
