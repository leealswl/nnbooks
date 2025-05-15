import {
  findLikedBooks,
  findFavGenre,
  delGenre,
} from "../models/myPageModel.js";

//좋아요 한 책 조회
export const getLikes = async (req, res) => {
  const { ownerEmail, holderEmail } = req.query;
  try {
    const likes = await findLikedBooks(ownerEmail, holderEmail);
    res.status(200).json(likes);
  } catch (error) {
    console.error("조회 실패:", error);
    res.status(500).json({ message: "조회 중 오류 발생" });
  }
};

//관심장르 조회
export const getFavGenre = async (req, res) => {
  const { email } = req.query;
  try {
    const genres = await findFavGenre(email);
    res.status(200).json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
};

//장르 삭제
export const deleteFavGenre = async (req, res) => {
  const { email, genre } = req.body;
  try {
    await delGenre(email, genre);
    res.status(201).json({ message: "장르 삭제 완료" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
};
