DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `FeedbackEstado_getById`(_id varchar(45))
    
    BEGIN
        
        select * from  FeedbackEstado where id=_id;
    
    END$$
    DELIMITER ;
    
    