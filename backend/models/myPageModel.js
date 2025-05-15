import { db } from "../config/db.js";

export const findLikedBooks = async (ownerEmail, holderEmail) => {
  const [rows] = await db.query(
    `SELECT id, bookID FROM userlibrary WHERE (ownerEmail = ? OR holderEmail = ?) AND isLiked = true`,
    [ownerEmail, holderEmail]
  );
  return rows;
};

export const findFavGenre = async (email) => {
  const [rows] = await db.query(`SELECT * FROM usergenre WHERE email = ?`, [
    email,
  ]);
  return rows;
};

export const delGenre = async (email, genre) => {
  const [result] = await db.query(
    `DELETE FROM usergenre WHERE email = ? AND genre = ?`,
    [email, genre]
  );
  return result;
};
