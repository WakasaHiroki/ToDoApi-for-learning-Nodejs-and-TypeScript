namespace MySql {
  export namespace TaskMergeCommand {
    // SQLServer用のSQL手直ししてない
    /**
     * DECLARE v_id varchar(36), v_operated_at datetime, v_title nvarchar(50), v_description nvarchar(500), v_is_deleted bit
     */
    export const CommandText: string = `
  MERGE INTO task T1
  USING (
    SELECT
      v_id AS [id],
      v_operated_at AS [operated_at]
    ) T2
    ON  T2.id = T1.id
    AND T2.operated_at = T1.operated_at
  WHEN MATCHED THEN
    UPDATE SET
      [operated_at] = v_operated_at,
      [title] = v_title,
      [description] = v_description,
      [is_deleted] = v_is_deleted
  WHEN NOT MATCHED THEN
    INSERT
      ([id],[operated_at],[title],[description],[is_deleted])
    VALUES
      (v_id, v_operated_at, v_title, v_description, v_is_deleted)
  ;`;
  }
}
