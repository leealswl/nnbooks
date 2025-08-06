import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import myPageRoutes from "./routes/myPageRoutes.js";
import aladinRouter from "./routes/aladin.js";

dotenv.config();

const app = express();
// 허용할 출처 목록
const allowedOrigins = [
    "http://localhost:8080",
  "https://nn-book.vercel.app",  // 기존 배포 프론트엔드 주소
  "http://localhost:5173",       // 로컬에서 테스트할 프론트엔드 주소 (Vite 기본)
];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/mypage", myPageRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/meeting", meetingRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/aladin", aladinRouter);

export default app;
