DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `Feedback_getAll`()
    
    BEGIN
        
        select * from  Feedback ;
    
    END$$
    DELIMITER ;
    
    