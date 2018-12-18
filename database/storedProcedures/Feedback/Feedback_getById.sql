DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `Feedback_getById`(_id varchar(45))
    
    BEGIN
        
        select * from  Feedback where id=_id;
    
    END$$
    DELIMITER ;
    
    