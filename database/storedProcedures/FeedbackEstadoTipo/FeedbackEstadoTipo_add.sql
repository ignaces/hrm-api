DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `FeedbackEstadoTipo_add`(
    in _codigo varchar(45),in _nombre varchar(45),in _orden varchar(45),in _activo tinyint(1),in _dt_cre datetime,in _dt_mod timestamp)
    BEGIN
        
        insert into FeedbackEstadoTipo values(UUID(),_codigo, _nombre, _orden, _activo, now(),now());
    
    END$$
    DELIMITER ;
    
    