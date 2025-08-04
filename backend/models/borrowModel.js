import dbPromise from "../config/db.js";

/**
 * 새로운 대여 가능 도서를 등록합니다.
 */
export const FetchNewBookLend = async (bookID, email, location) => {
  // 함수가 실행될 때마다, 먼저 약속이 이행되길 기다려서 실제 DB 연결 풀(pool)을 얻습니다.
  const db = await dbPromise;

  const [result] = await db.query(
    "INSERT INTO registerbooklend (bookId, ownerEmail, location) VALUES (:1, :2, :3)",
    [bookID, email, location]
  );
  return result;
};

/**
 * 도서의 대여 가능 상태를 true로 변경합니다.
 */
export const changeLendStatus = async (bookID) => {
  // 이 함수에서도 똑같이 DB 연결을 기다립니다.
  const db = await dbPromise;

  const [result] = await db.query(
    "UPDATE userlibrary SET isLendable = 1 WHERE bookId = :1", // Oracle에서는 boolean 대신 1(true) 또는 0(false)을 주로 사용합니다.
    [bookID]
  );
  return result;
};

/**
 * 도서의 대여 가능 상태를 false로 변경합니다.
 */
export const changeLendStatusFalse = async (bookId) => {
  // 여기도 마찬가지입니다.
  const db = await dbPromise;

  const [result] = await db.query(
    "UPDATE userlibrary SET isLendable = 0 WHERE bookId = :1",
    [bookId]
  );
  return result;
};

/**
 * 대여 가능한 모든 도서 목록을 조회합니다.
 */
export const fetchAllBookLend = async () => {
  // 모든 함수에 동일하게 적용합니다.
  const db = await dbPromise;

  const [rows] = await db.query("SELECT * FROM registerbooklend");
  return rows;
};

/**
 * 도서 대출을 요청하고, 책의 상태를 '대출 중'으로 변경합니다.
 */
export const FetchBorrowReq = async (email, bookId) => {
  const db = await dbPromise;

  const [result] = await db.query(
    "UPDATE userlibrary SET isBorrowed = 1, holderEmail = :1 WHERE bookId = :2 AND isLendable = 1",
    [email, bookId]
  );
  return result;
};

/**
 * 대출이 완료된 책을 대여 가능 목록에서 삭제합니다.
 */
export const deleteBookLend = async (bookId) => {
  const db = await dbPromise;
  
  const [result] = await db.query(
    "DELETE FROM registerbooklend WHERE bookId = :1",
    [bookId]
  );
  return result;
};

/**
 * 특정 사용자가 빌리고 있는 책 목록을 조회합니다.
 */
export const findBorrowingBook = async (email) => {
  const db = await dbPromise;

  // MySQL의 `&&`는 Oracle에서 지원하지 않으므로 표준 SQL인 `AND`를 사용해야 합니다.
  // 또한 Oracle에서는 테이블/컬럼명에 대소문자를 구분하므로 `noonalibrary` 스키마 이름은 보통 생략하거나 정확히 맞춰야 합니다.
  // 바인드 변수도 `?` 대신 `:1`, `:2` 와 같이 순서 기반으로 사용하는 것이 더 안전합니다.
  const [rows] = await db.query(
    `SELECT id, bookID FROM userlibrary WHERE holderEmail = :1 AND ownerEmail != :2`,
    [email, email]
  );
  return rows;
};