DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `FeedbackOpinanteEncuesta_getAll`()
    
    BEGIN
        
        select * from  FeedbackOpinanteEncuesta ;
    
    END$$
    DELIMITER ;
    
    