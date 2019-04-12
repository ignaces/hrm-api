DROP PROCEDURE IF EXISTS pos_CargaPuntoVenta;

DELIMITER $$
CREATE PROCEDURE pos_CargaPuntoVenta()
BEGIN
DECLARE v_id varchar(45);
DECLARE v_codigoPuntoVenta VARCHAR(45);
DECLARE v_nombrePuntoVenta VARCHAR(90);
DECLARE v_nombre           VARCHAR(45);
DECLARE v_retail           VARCHAR(45);
declare v_direccion        VARCHAR(45);
DECLARE v_cantidad_insert  INTEGER DEFAULT 0;
DECLARE v_total_insert     integer DEFAULT 0;
DECLARE v_cuenta_existe    INTEGER DEFAULT 0;
DECLARE v_cuenta_registros INTEGER DEFAULT 0;
DECLARE fin INTEGER DEFAULT 0;

DECLARE ptoVenta_cursor CURSOR FOR
    SELECT codigo,retail,nombre,direccion from tmp_PvPuntoDeVenta;

 -- Condición de salida
 DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin=1;

 DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
 BEGIN
    SHOW ERRORS LIMIT 1;
    ROLLBACK;
 END;
 DECLARE CONTINUE HANDLER FOR SQLWARNING
 BEGIN
    SHOW WARNINGS LIMIT 1;
    ROLLBACK;
 END;

 START TRANSACTION;

  OPEN ptoVenta_cursor;
  get_punto: LOOP
  FETCH ptoVenta_cursor INTO v_codigoPuntoVenta, v_retail,v_nombre,v_direccion;
    IF fin = 1 THEN
       LEAVE get_punto;
    END IF;

    # valido si existe Punto Venta
    if v_codigoPuntoVenta is null then
       set v_codigoPuntoVenta='99';
    else

       SET v_id=(select id from PvPuntoDeVenta where codigo=v_codigoPuntoVenta);
    end if;

    # Nombre Punto Venta
    set v_nombrePuntoVenta=concat(v_retail,'-',v_nombre);

       if (v_id is null OR v_codigoPuntoVenta != '99') then

           set v_id=UUID();

          insert into PvPuntoDeVenta(
                id,
                nombre,
                direccion,
                codigo,
                activo,
                dt_cre)
              VALUES(
                  v_id,
                  v_nombrePuntoVenta,
                  v_direccion,
                  v_codigoPuntoVenta,
                  1,
                  CURRENT_TIME
                );

                 set v_cantidad_insert=(select ROW_COUNT());
                 set v_total_insert=v_total_insert + v_cantidad_insert ;
                 COMMIT;

       else

          set v_cuenta_existe=v_cuenta_existe +1;

      end if;


      SET v_cuenta_registros= v_cuenta_registros+1;

  END LOOP get_punto;

  CLOSE ptoVenta_cursor;

  select concat('Leidos :',v_cuenta_registros,' Existen :',v_cuenta_existe,' Creados :',v_total_insert) as salida;


END;
$$
DELIMITER;

/*call carga_pvPuntoVenta();

call carga_productos();

select *
from PvPuntoDeVenta
where nombre is null
order by dt_cre desc

select *
from tmp_PvPuntoDeVenta
where codigo is null
*/



