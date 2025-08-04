// db.js가 내보내는 '약속(Promise)'을 가져와서 'dbPromise'라는 명확한 이름으로 받습니다.
import dbPromise from "../config/db.js";

export const findReadingBooks = async (email) => {
  // 함수가 실행되면, 먼저 약속이 이행되길 기다려서 실제 DB 연결(pool)을 얻습니다.
  const db = await dbPromise;

  // SQL에서 문자열 값은 쌍따옴표(")가 아닌 홑따옴표(')를 사용해야 합니다.
  const [rows] = await db.query(
    `SELECT id, bookID FROM userlibrary WHERE (ownerEmail = :1 OR holderEmail = :2) AND status = 'reading'`,
    [email, email]
  );
  return rows;
};

export const findFinishedBooks = async (email) => {
  const db = await dbPromise;
  const [rows] = await db.query(
    `SELECT id, bookID FROM userlibrary WHERE (ownerEmail = :1 OR holderEmail = :2) AND status = 'finished'`,
    [email, email]
  );
  return rows;
};

export const findLendedBooks = async (email) => {
  const db = await dbPromise;
  // Oracle에서는 boolean 값으로 true/false 대신 숫자 1/0을 사용하는 것이 더 안전합니다.
  const [rows] = await db.query(
    `SELECT id, bookID FROM userlibrary WHERE ownerEmail = :1 AND isBorrowed = 1`,
    [email]
  );
  return rows;
};

export const addNewBook = async (bookID, ownerEmail, holderEmail) => {
  const db = await dbPromise;
  // 바인드 변수를 '?' 대신 ':1, :2' 등으로 사용하는 것이 Oracle에서 더 안정적입니다.
  const [result] = await db.query(
    "INSERT INTO userlibrary (bookID, ownerEmail, holderEmail) VALUES (:1, :2, :3)",
    [bookID, ownerEmail, holderEmail]
  );
  return result;
};

export const changeStatus = async (bookID, email) => {
  const db = await dbPromise;
  const [result] = await db.query(
    `
    UPDATE userlibrary
    SET status = 'finished'
    WHERE bookId = :1
      AND (holderEmail = :2 OR ownerEmail = :3)
    `,
    [bookID, email, email]
  );
  return result;
};

export const changeLike = async (bookID, email) => {
  const db = await dbPromise;
  const [result] = await db.query(
    `
    UPDATE userlibrary
    SET isLiked = 1, status = 'finished'
    WHERE bookId = :1
      AND (ownerEmail = :2 OR holderEmail = :3)
    `,
    [bookID, email, email]
  );
  console.log("변경된 행 수:", result.affectedRows);
  return result;
};

export const findLiked = async (email) => {
  const db = await dbPromise;
  const [rows] = await db.query(
    `SELECT id, bookID FROM userlibrary WHERE (ownerEmail = :1 OR holderEmail = :2) AND isLiked = 1`,
    [email, email]
  );
  return rows;
};