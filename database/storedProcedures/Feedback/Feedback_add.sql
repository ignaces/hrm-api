DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `Feedback_add`(
    in _idEdeEtapa varchar(45),in _nombre varchar(150),in _activo tinyint(1),in _dt_cre datetime,in _dt_mod timestamp)
    BEGIN
        
        insert into Feedback values(UUID(),_idEdeEtapa, _nombre, _activo, now(),now());
    
    END$$
    DELIMITER ;
    
    