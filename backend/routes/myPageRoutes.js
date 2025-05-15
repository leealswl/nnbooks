import express from "express";
import {
  getLikes,
  getFavGenre,
  deleteFavGenre,
} from "../controllers/myPageController.js";

const router = express.Router();

router.get("/likes", getLikes);
router.get("/favgenre", getFavGenre);
router.delete("/favgenre", deleteFavGenre);

router.get("/likes", (req, res) => {
  const { ownerEmail, holderEmail } = req.query;
  res.json({ message: "좋아요 조회 성공", email });
});

router.get("/favgenre", (req, res) => {
  const { email } = req.query;
  res.json({ message: "관심장르 조회 성공", email });
});

router.delete("/favgenre", (req, res) => {
  const { email, genre } = req.body;
  res.json({ message: "관심장르 삭제 성공", email });
});

export default router;
