import oracledb from "oracledb";
import dotenv from "dotenv";

dotenv.config();

// DB 조회 결과를 항상 JavaScript 객체로 반환
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};

// 애플리케이션 시작 시 DB 연결 풀을 생성하는 비동기 함수
async function initialize() {
  try {
    // dbConfig를 사용하여 연결 풀을 생성합니다.
    await oracledb.createPool(dbConfig);
    console.log("✅ Oracle DB Connection Pool 생성 성공!");
  } catch (err) {
    console.error("❌ Oracle DB Connection Pool 생성 실패:", err);
    process.exit(1); // 풀 생성에 실패하면 프로세스를 종료합니다.
  }
}

// 애플리케이션 종료 시 풀을 닫는 함수 (선택적이지만 권장)
async function closePool() {
    try {
        await oracledb.getPool().close(10);
        console.log("Oracle DB Connection Pool 닫힘.");
    } catch(err) {
        console.error("Error closing the connection pool", err);
    }
}

// 이 모듈이 로드될 때 풀 생성 함수를 즉시 호출합니다.
initialize();

// SIGINT, SIGTERM 시그널을 수신하여 풀을 안전하게 닫도록 설정
process.once('SIGTERM', closePool);
process.once('SIGINT', closePool);

// 모델 파일에서 사용할 수 있도록 oracledb 객체를 그대로 내보냅니다.
// 이제 다른 파일에서 oracledb.getConnection()을 호출하면 풀에서 연결을 가져옵니다.
export default oracledb;