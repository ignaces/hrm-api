DELIMITER $$
    CREATE DEFINER=`root`@`localhost` PROCEDURE `FeedbackOpinante_add`(
    in _idOpinante varchar(45),in _idOpinado varchar(45),in _idFeedback varchar(45),in _idEstadoFeedback varchar(45),in _idEstadoAvance varchar(45),in _observacion mediumtext,in _checkOpinado tinyint(1),in _checkOpinante tinyint(1),in _activo tinyint(1),in _dt_cre datetime,in _dt_mod timestamp)
    BEGIN
        
        insert into FeedbackOpinante values(UUID(),_idOpinante, _idOpinado, _idFeedback, _idEstadoFeedback, _idEstadoAvance, _observacion, _checkOpinado, _checkOpinante, _activo, now(),now());
    
    END$$
    DELIMITER ;
    
    