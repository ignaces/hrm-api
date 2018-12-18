DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `FeedbackEstado_getAll`()
    
    BEGIN
        
        select * from  FeedbackEstado ;
    
    END$$
    DELIMITER ;
    
    