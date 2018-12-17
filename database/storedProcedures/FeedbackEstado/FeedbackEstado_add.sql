DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `FeedbackEstado_add`(
    in _idFeedbackEstadoTipo varchar(45),in _nombre varchar(45),in _codigo varchar(45),in _orden int(11),in _activo tinyint(1),in _dt_cre datetime,in _dt_mod timestamp)
    BEGIN
        
        insert into FeedbackEstado values(UUID(),_idFeedbackEstadoTipo, _nombre, _codigo, _orden, _activo, now(),now());
    
    END$$
    DELIMITER ;
    
    