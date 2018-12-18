DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `FeedbackOpinanteEncuesta_getById`(_id varchar(45))
    
    BEGIN
        
        select * from  FeedbackOpinanteEncuesta where id=_id;
    
    END$$
    DELIMITER ;
    
    