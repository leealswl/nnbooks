import oracledb from "oracledb";
import dotenv from "dotenv";
dotenv.config();

const poolPromise = (async () => {
  try {
    const pool = await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });
    console.log("✅ Oracle DB 연결 성공!");
    return pool;
  } catch (err) {
    console.error("❌ Oracle DB 연결 실패:", err.message);
    process.exit(1); 
  }
})();

export default poolPromise;