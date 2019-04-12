DROP PROCEDURE IF EXISTS `pos_ActualizaPuntoVenta`;

DELIMITER $$
CREATE PROCEDURE `pos_ActualizaPuntoVenta`
  (
    IN p_id VARCHAR(45),
    IN p_nombre VARCHAR(45),
    IN p_direccion VARCHAR(45),
    IN p_codigo VARCHAR(45),
    IN p_activo TINYINT
  )
  BEGIN

    DECLARE v_mensaje text;
    DECLARE v_cantidad_update int;

    if (p_activo=0 or p_activo=1) then
       UPDATE PvPuntoDeVenta SET nombre=p_nombre, direccion=p_direccion, codigo=p_codigo, activo=p_activo
       WHERE id=p_id;

       set v_cantidad_update=(select ROW_COUNT());
       if v_cantidad_update >0 then
          select * from PvPuntoDeVenta where id=p_id;
       else
          set v_mensaje='No se Modifico Registro';
          select v_mensaje;
       end if;
    else
       set v_mensaje='Valor Para columa activo no corresponde';
          select v_mensaje;
    end if;

  END;
$$
DELIMITER;
