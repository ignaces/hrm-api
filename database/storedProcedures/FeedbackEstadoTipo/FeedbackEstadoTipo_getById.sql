DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `FeedbackEstadoTipo_getById`(_id varchar(45))
    
    BEGIN
        
        select * from  FeedbackEstadoTipo where id=_id;
    
    END$$
    DELIMITER ;
    
    