// models/userModel.js (완전한 최종본)

import dbPromise from "../config/db.js";

// Oracle DB와 통신하는 모든 함수는 이 3단계 구조를 따라야 합니다.
// 1. getConnection() : DB 연결(connection)을 빌려온다.
// 2. connection.execute() : 빌려온 연결로 쿼리를 실행한다.
// 3. connection.close() : 사용한 연결을 반드시 반납한다.

export const findUserByEmail = async (email) => {
  const pool = await dbPromise;
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM userinfo WHERE email = :1",
      [email]
    );
    return rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

export const createUser = async (
  email,
  name,
  nickname,
  hashedPassword,
  location
) => {
  const pool = await dbPromise;
  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.execute(
      "INSERT INTO userinfo (email, name, nickname, password, location) VALUES (:1, :2, :3, :4, :5)",
      [email, name, nickname, hashedPassword, location]
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

export const findAllUsers = async () => {
  const pool = await dbPromise;
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT email, name, location FROM userinfo");
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

export const createFavGenre = async (email, genre) => {
  const pool = await dbPromise;
  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.execute(
      "INSERT INTO usergenre (email, genre) VALUES (:1, :2)",
      [email, genre]
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

export const fetchMyInfo = async (email) => {
  const pool = await dbPromise;
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT email, name, nickname, location FROM userinfo WHERE email = :1",
      [email]
    );
    return rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

// authController.js가 찾고 있던 바로 그 함수입니다.
export const changeLocationInfo = async (email, location) => {
  const pool = await dbPromise;
  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.execute(
      "UPDATE userinfo SET location = :1 WHERE email = :2",
      [location, email]
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};