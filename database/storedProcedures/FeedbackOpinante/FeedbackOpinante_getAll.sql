DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `FeedbackOpinante_getAll`()
    
    BEGIN
        
        select * from  FeedbackOpinante ;
    
    END$$
    DELIMITER ;
    
    