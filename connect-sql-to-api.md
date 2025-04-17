
🔍 Essa procedure faz uma chamada HTTP para minha API Node.js e importa os dados para a tabela `TAREFAS` no SQL Server. Ela valida o JSON e insere os registros automaticamente.

CREATE PROCEDURE ImportarDadosAPI 
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE 
        @intToken INT,
        @vchURL VARCHAR(MAX),
        @vchJSON VARCHAR(8000);

    SET @vchURL = 'http://localhost:3333/api/task';

    EXEC sp_OACreate 'MSXML2.XMLHTTP', @intToken OUT;
    EXEC sp_OAMethod @intToken, 'open', NULL, 'get', @vchURL, 'false';
    EXEC sp_OAMethod @intToken, 'send';
    EXEC sp_OAMethod @intToken, 'responseText', @vchJSON OUTPUT;

    IF (ISJSON(@vchJSON) = 1)
    BEGIN
        INSERT INTO TAREFAS (id, title, descriptionText, priorityStatus, completed, dueDate)
        SELECT 
            id,
            title,
            descriptionText,
            priorityStatus,
            CAST(completed AS BIT),
            CAST(dueDate AS DATE)
        FROM OPENJSON(@vchJSON)
        WITH (
            id VARCHAR(100),
            title VARCHAR(100),
            descriptionText VARCHAR(MAX) '$.description',
            priorityStatus VARCHAR(50) '$.priority',
            completed BIT,
            dueDate DATE
        );

        SELECT
            id AS Identificador,
            title AS Título,
            descriptionText AS [Descrição],
            priorityStatus AS Prioridade,
            completed AS [Está concluída?],
            dueDate AS [Data de vencimento]
        FROM TAREFAS;
    END
    ELSE
    BEGIN
        PRINT 'O conteúdo retornado não é um JSON válido.';
    END

    EXEC sp_OADestroy @intToken;
END;
