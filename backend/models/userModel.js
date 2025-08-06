import oracledb from "../config/db.js";

// Oracle DB와 통신.
// 1. getConnection() : DB 연결(connection)을 빌려온다.
// 2. connection.execute() : 빌려온 연결로 쿼리를 실행한다.
// 3. connection.close() : 사용한 연결을 반드시 반납한다.

export const findUserByEmail = async (email) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const { rows } = await connection.execute(
      "SELECT * FROM userinfo WHERE email = :1",
      [email]
    );
    
    console.log("DB에서 직접 가져온 rows 값:", rows);
    console.log("return 직전의 값 (rows[0]):", rows[0]);
    return rows[0]; // 사용자가 없으면 undefined가 반환되어 정상 동작합니다.
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close(); // 사용한 연결은 반드시 풀에 반납합니다.
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
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      "INSERT INTO userinfo (email, name, nickname, password, location) VALUES (:1, :2, :3, :4, :5)",
      [email, name, nickname, hashedPassword, location]
    );

    await connection.commit(); 
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
  let connection;
  try {
    connection = await oracledb.getConnection();
    const {rows} = await connection.execute("SELECT email, name, location FROM userinfo");
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
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      "INSERT INTO usergenre (email, genre) VALUES (:1, :2)",
      [email, genre]
    );
    await connection.commit(); 

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
  let connection;
  try {
    connection = await oracledb.getConnection();
    const {rows} = await connection.execute(
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

export const changeLocationInfo = async (email, location) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      "UPDATE userinfo SET location = :1 WHERE email = :2",
      [location, email]
    );
    await connection.commit(); 

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