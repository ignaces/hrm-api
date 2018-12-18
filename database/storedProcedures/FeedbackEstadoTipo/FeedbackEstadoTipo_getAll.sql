DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `FeedbackEstadoTipo_getAll`()
    
    BEGIN
        
        select * from  FeedbackEstadoTipo ;
    
    END$$
    DELIMITER ;
    
    