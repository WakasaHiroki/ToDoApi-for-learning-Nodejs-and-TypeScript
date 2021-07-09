namespace SqlServer {
  export namespace TaskFindQuery {
    /**
     * DECLARE @id varchar(36)
     */
    export const QueryText: string = `
  SELECT
    T1.id,
    T1.operated_at,
    T1.title,
    T1.description,
    T1.is_deleted
  FROM
    task T1
  WHERE T1.id = @id
    AND T1.is_deleted = 0
    AND NOT EXISTS (
      SELECT 1 FROM task T1E1
      WHERE T1E1.id = T1.id
        AND T1E1.is_deleted = 0
        AND T1E1.operated_at > T1.operated_at
      )
  ;`;
  }
}
