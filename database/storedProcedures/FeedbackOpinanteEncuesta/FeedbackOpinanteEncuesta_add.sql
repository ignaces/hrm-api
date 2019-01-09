DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `FeedbackOpinanteEncuesta_add`(
    in _idFeedbackOpinante varchar(45),in _idEncuestaPersona varchar(45),in _activo tinyint(1),in _dt_cre datetime,in _dt_mod timestamp)
    BEGIN
        
        insert into FeedbackOpinanteEncuesta values(UUID(),_idFeedbackOpinante, _idEncuestaPersona, _activo, now(),now());
    
    END$$
    DELIMITER ;
    
    