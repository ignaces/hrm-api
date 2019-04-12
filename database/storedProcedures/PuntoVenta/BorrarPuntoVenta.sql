DROP PROCEDURE IF EXISTS `pos_BorrarPuntoVenta`;

DELIMITER $$
CREATE PROCEDURE `pos_BorrarPuntoVenta`
  (
    IN p_id VARCHAR(45)
  )
  BEGIN

    DECLARE v_mensaje text;

    DELETE FROM PvPuntoDeVenta WHERE id=p_id;

    set v_mensaje='Eliminó el registro.';
    select v_mensaje;

  END;
$$
DELIMITER;

