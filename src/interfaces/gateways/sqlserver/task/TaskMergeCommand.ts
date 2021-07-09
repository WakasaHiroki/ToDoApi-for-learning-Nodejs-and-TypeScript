namespace SqlServer {
  export namespace TaskMergeCommand {
    /**
     * DECLARE @id varchar(36), @operated_at datetime, @title nvarchar(50), @description nvarchar(500), @is_deleted bit
     */
    export const CommandText: string = `
  MERGE INTO task T1
  USING (
    SELECT
      @id AS [id],
      @operated_at AS [operated_at]
    ) T2
    ON  T2.id = T1.id
    AND T2.operated_at = T1.operated_at
  WHEN MATCHED THEN
    UPDATE SET
      [operated_at] = @operated_at,
      [title] = @title,
      [description] = @description,
      [is_deleted] = @is_deleted
  WHEN NOT MATCHED THEN
    INSERT
      ([id],[operated_at],[title],[description],[is_deleted])
    VALUES
      (@id, @operated_at, @title, @description, @is_deleted)
  ;`;
  }
}
