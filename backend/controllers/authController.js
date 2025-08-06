import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createFavGenre,
  createUser,
  findAllUsers,
  findUserByEmail,
  fetchMyInfo,
  changeLocationInfo,
} from "../models/userModel.js";

// 이메일 중복 확인
export const checkEmail = async (req, res) => {
  const { email } = req.body;
  console.log("중복 확인 요청 이메일:", email);
  try {
    const user = await findUserByEmail(email);
    // ================== [디버깅 로그 1] ==================
    console.log("userModel에서 실제로 반환된 값:", user);
    console.log("반환된 값의 타입:", typeof user);
    if (user) {
      console.log("if (user) 조건이 '참'으로 판단됨 -> false 반환"); // if문이 실행됐는지 확인
      return res.json({ available: false });
    }
     console.log("if (user) 조건이 '거짓'으로 판단됨 -> true 반환"); // else문이 실행됐는지 확인
    return res.json({ available: true });
  } catch (error) {
    console.error("이메일 중복 확인 오류:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};
//회원가입
export const register = async (req, res) => {
  const { email, name, nickname, password, location, genres } = req.body;
  console.log("회원가입 요청", { email, name, nickname, location, genres });

  try {
    const existingUser = await findUserByEmail(email);
    console.log("이메일 중복검사 결과", !!existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "이미 가입된 이메일입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 비밀번호 해시 완료");

    await createUser(email, name, nickname, hashedPassword, location);
    console.log("👤 사용자 정보 DB 저장 완료");

    //관심장르 설정
    await Promise.all(
      genres.map((g) => {
        console.log("🎯 관심 장르 등록:", g);
        createFavGenre(email, g);
      })
    );
        

    res.status(201).json({ message: "회원가입 성공!" });
  } catch (error) {
    console.error("회원가입 중 오류", error);
    res.status(500).json({ message: "서버 에러" });
  }
};


//로그인
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("\n================ [로그인 요청 시작] ================");
    console.log("1. 요청 본문:", { email });

    const user = await findUserByEmail(email);
     console.log("2. DB 조회 결과 (user 객체):", user);
    if (!user) {
      console.log("-> 결과: 유저 없음. 400 에러 응답 보냄.");
      return res
        .status(400)
        .json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }

    // user.password -> user.PASSWORD (대문자)
    const isMatch = await bcrypt.compare(password, user.PASSWORD);
    console.log("3. 비밀번호 비교 완료 (isMatch):", isMatch);

    if (!isMatch) {
      console.log("-> 결과: 비밀번호 불일치. 400 에러 응답 보냄.");
      return res
        .status(400)
        .json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }

    // user.id -> user.ID (대문자)
    console.log("4. JWT 토큰 생성 시작. 담길 정보:", { id: user.ID, email: user.EMAIL });
    const token = jwt.sign(
      { id: user.ID, email: user.EMAIL },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("5. 토큰 생성 완료. 로그인 성공!");
    console.log("================ [로그인 요청 종료] ================\n");

    res.json({ message: "로그인 성공!", token });

  } catch (error) {
    console.error("🚨🚨🚨 로그인 컨트롤러 에러:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};
//사용자 조회
export const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("사용자 조회 실패:", error);
    res.status(500).json({ message: "사용자 조회 중 오류 발생" });
  }
};

//내 정보 조회
export const getMyInfo = async (req, res) => {
  try {
    const { email } = req.user; // verifyToken에서 저장된 정보
    const user = await fetchMyInfo(email);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("사용자 조회 실패:", error);
    res.status(500).json({ message: "사용자 조회 중 오류 발생" });
  }
};

//위치 변경
export const changeLocation = async (req, res) => {
  const { email } = req.user; // 토큰에서 이메일
  const { location } = req.body; // 요청 본문에서 새 위치

  try {
    await changeLocationInfo(email, location);
    res.status(200).json({ message: "변경 완료", location });
  } catch (error) {
    console.error("위치 변경 에러:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};
