DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `FeedbackOpinante_getById`(_id varchar(45))
    
    BEGIN
        
        select * from  FeedbackOpinante where id=_id;
    
    END$$
    DELIMITER ;
    
    