// db.js가 내보내는 '약속(Promise)'을 가져와서 'dbPromise'라는 이름으로 받습니다.
import dbPromise from "../config/db.js";

export const findMeetingByEmail = async (leaderEmail) => {
  // 함수가 실행될 때마다, 먼저 약속이 이행되길 기다려서 실제 DB 연결 풀(pool)을 얻습니다.
  const db = await dbPromise;

  const [rows] = await db.query(
    "SELECT * FROM bookclub WHERE leaderEmail = :1",
    [leaderEmail]
  );
  return rows[0];
};

export const addNewMeeting = async (
  leaderEmail,
  location,
  date,
  time,
  title,
  content
) => {
  const db = await dbPromise;

  const [result] = await db.query(
    "INSERT INTO bookclub (leaderEmail, location, date, time, title, content) VALUES (:1, :2, :3, :4, :5, :6)",
    [leaderEmail, location, date, time, title, content]
  );
  return result;
};

export const deleteMeetingById = async (id) => {
  const db = await dbPromise;

  const [result] = await db.query("DELETE FROM bookclub WHERE id = :1", [id]);
  return result;
};

/**
 * [중요] 페이징 쿼리 문법이 MySQL과 Oracle은 다릅니다.
 * MySQL: LIMIT [개수] OFFSET [건너뛸 개수]
 * Oracle: OFFSET [건너뛸 개수] ROWS FETCH NEXT [가져올 개수] ROWS ONLY
 */
export const fetchAllMeetings = async (page, pageSize) => {
  const db = await dbPromise;
  const offset = (page - 1) * pageSize;

  // Oracle 페이징 문법으로 수정
  const [rows] = await db.query(
    "SELECT * FROM bookclub ORDER BY date DESC, time DESC OFFSET :1 ROWS FETCH NEXT :2 ROWS ONLY",
    [offset, pageSize] // 파라미터 순서도 바뀝니다! offset -> pageSize
  );
  return rows;
};

export const fetchTotalMeetingCount = async () => {
  const db = await dbPromise;

  const [rows] = await db.query("SELECT COUNT(*) AS total FROM bookclub");
  return rows[0].total;
};

export const addNewMember = async (leaderEmail, memberEmail) => {
  const db = await dbPromise;

  const [result] = await db.query(
    "INSERT INTO bookclubmember (leaderEmail, memberEmail) VALUES (:1, :2)",
    [leaderEmail, memberEmail]
  );
  return result;
};

export const fetchAllMembers = async (leaderEmail) => {
  const db = await dbPromise;

  const [rows] = await db.query(
    "SELECT * FROM bookclubmember WHERE leaderEmail = :1",
    [leaderEmail]
  );
  return rows;
};