import oracledb from "../config/db.js";

/**
 * 사용자가 현재 읽고 있는 책 목록을 조회합니다.
 * @param {string} email 사용자 이메일
 */
export const findReadingBooks = async (email) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const { rows } = await connection.execute(
      `SELECT ID, BOOKID FROM USERLIBRARY WHERE (OWNEREMAIL = :1 OR HOLDEREMAIL = :2) AND STATUS = 'reading'`,
      [email, email]
    );
    return rows;
  } catch (err) {
    console.error("읽고 있는 책 조회 오류:", err);
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

/**
 * 사용자가 다 읽은 책 목록을 조회합니다.
 * @param {string} email 사용자 이메일
 */
export const findFinishedBooks = async (email) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const { rows } = await connection.execute(
      `SELECT ID, BOOKID FROM USERLIBRARY WHERE (OWNEREMAIL = :1 OR HOLDEREMAIL = :2) AND STATUS = 'finished'`,
      [email, email]
    );
    return rows;
  } catch (err) {
    console.error("다 읽은 책 조회 오류:", err);
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

/**
 * 사용자가 빌려준 책 목록을 조회합니다.
 * @param {string} email 사용자 이메일
 */
export const findLendedBooks = async (email) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const { rows } = await connection.execute(
      `SELECT ID, BOOKID FROM USERLIBRARY WHERE OWNEREMAIL = :1 AND ISBORROWED = 1`,
      [email]
    );
    return rows;
  } catch (err) {
    console.error("빌려준 책 조회 오류:", err);
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

/**
 * 내 서재에 새로운 책을 추가합니다.
 * @param {string} bookID 책 ID
 * @param {string} ownerEmail 소유자 이메일
 * @param {string} holderEmail 보유자 이메일
 */
export const addNewBook = async (bookID, ownerEmail, holderEmail) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      "INSERT INTO USERLIBRARY (BOOKID, OWNEREMAIL, HOLDEREMAIL) VALUES (:1, :2, :3)",
      [bookID, ownerEmail, holderEmail]
    );
    await connection.commit(); // 중요: INSERT 후에는 반드시 커밋해야 합니다.
    return result;
  } catch (err) {
    console.error("새 책 추가 오류:", err);
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

/**
 * 책의 상태를 'finished'(완독)으로 변경합니다.
 * @param {string} bookID 책 ID
 * @param {string} email 사용자 이메일
 */
export const changeStatus = async (bookID, email) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      `UPDATE USERLIBRARY
       SET STATUS = 'finished'
       WHERE BOOKID = :1 AND (HOLDEREMAIL = :2 OR OWNEREMAIL = :3)`,
      [bookID, email, email]
    );
    await connection.commit(); // 중요: UPDATE 후에는 반드시 커밋해야 합니다.
    return result;
  } catch (err) {
    console.error("책 상태 변경 오류:", err);
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

/**
 * 책의 좋아요(isLiked) 상태를 변경하고, 완독 상태로 함께 변경합니다.
 * @param {string} bookID 책 ID
 * @param {string} email 사용자 이메일
 */
export const changeLike = async (bookID, email) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      `UPDATE USERLIBRARY
       SET ISLIKED = 1, STATUS = 'finished'
       WHERE BOOKID = :1 AND (OWNEREMAIL = :2 OR HOLDEREMAIL = :3)`,
      [bookID, email, email]
    );
    await connection.commit(); // 중요: UPDATE 후에는 반드시 커밋해야 합니다.
    console.log("변경된 행 수:", result.rowsAffected);
    return result;
  } catch (err) {
    console.error("좋아요 변경 오류:", err);
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

/**
 * 사용자가 좋아요 표시한 책 목록을 조회합니다.
 * @param {string} email 사용자 이메일
 */
export const findLiked = async (email) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const { rows } = await connection.execute(
      `SELECT ID, BOOKID FROM USERLIBRARY WHERE (OWNEREMAIL = :1 OR HOLDEREMAIL = :2) AND ISLIKED = 1`,
      [email, email]
    );
    return rows;
  } catch (err) {
    console.error("좋아요 책 조회 오류:", err);
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