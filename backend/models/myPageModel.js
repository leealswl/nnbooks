// db.js가 내보내는 '약속(Promise)'을 가져와서 'dbPromise'라는 이름으로 받습니다.
import dbPromise from "../config/db.js";

export const findLikedBooks = async (ownerEmail, holderEmail) => {
  // 함수가 실행될 때마다, 먼저 약속이 이행되길 기다려서 실제 DB 연결 풀(pool)을 얻습니다.
  const db = await dbPromise;

  // Oracle에서는 boolean 값으로 1(true)을, 바인드 변수로 :1, :2를 사용합니다.
  const [rows] = await db.query(
    `SELECT id, bookID FROM userlibrary WHERE (ownerEmail = :1 OR holderEmail = :2) AND isLiked = 1`,
    [ownerEmail, holderEmail]
  );
  return rows;
};

export const findFavGenre = async (email) => {
  const db = await dbPromise;

  const [rows] = await db.query(`SELECT * FROM usergenre WHERE email = :1`, [
    email,
  ]);
  return rows;
};

export const delGenre = async (email, genre) => {
  const db = await dbPromise;

  const [result] = await db.query(
    `DELETE FROM usergenre WHERE email = :1 AND genre = :2`,
    [email, genre]
  );
  return result;
};