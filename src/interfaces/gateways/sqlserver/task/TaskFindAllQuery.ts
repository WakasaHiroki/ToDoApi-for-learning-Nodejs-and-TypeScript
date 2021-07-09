namespace SqlServer {
  export namespace TaskFindAllQuery {
    export const QueryText: string = `
  SELECT
    T1.id,
    T1.operated_at,
    T1.title,
    T1.description,
    T1.is_deleted
  FROM
    task T1
  WHERE T1.is_deleted = 0
  ;`;
  }
}
