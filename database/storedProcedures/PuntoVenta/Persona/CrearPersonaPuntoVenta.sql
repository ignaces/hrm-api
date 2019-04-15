DROP PROCEDURE IF EXISTS pos_CrearPersonaPuntoVenta;

DELIMITER $$
CREATE PROCEDURE `pos_CrearPersonaPuntoVenta`
  ( p_id VARCHAR(45),
    p_persona VARCHAR(45)
  )
  BEGIN

    DECLARE v_id varchar(45);
    DECLARE v_persona varchar(45);
    DECLARE v_mensaje text;

    SET v_id=(select id from PvPuntoDeVenta where id=p_id);
    SET v_persona=(select id from Persona where id=p_persona);

    if (v_id is null AND v_persona is null) then

      SET v_mensaje='Las relaciones no son correctas.';

    else

      insert into PvPersonaPuntoDeVenta(idPersona, desde, hasta, activo, dt_cre, idPvPuntoDeVenta)
      values (v_persona, NOW(), DATE_ADD(NOW(), INTERVAL 1 YEAR), 1, NOW(), v_id);

      SET v_mensaje='Se creó la relación exitosamente.';

    end if;

    select v_mensaje;

  END;
$$
DELIMITER;
