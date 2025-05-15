import express from "express";
import axios from "axios";

const router = express.Router();
const BASE_URL = "http://www.aladin.co.kr/ttb/api";

// 1. ItemSearch
router.get("/ItemSearch.aspx", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/ItemSearch.aspx`, {
      params: {
        ...req.query,
        TTBKey: process.env.ALADIN_TTB_KEY,
        Output: "JS",
        Version: "20131101",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("ItemSearch API 요청 실패:", error.message);
    res.status(500).json({ error: "ItemSearch 요청 실패" });
  }
});

// 2. ItemList
router.get("/ItemList.aspx", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/ItemList.aspx`, {
      params: {
        ...req.query,
        TTBKey: process.env.ALADIN_TTB_KEY,
        Output: "JS",
        Version: "20131101",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("ItemList API 요청 실패:", error.message);
    res.status(500).json({ error: "ItemList 요청 실패" });
  }
});

// 3. ItemLookUp
router.get("/ItemLookUp.aspx", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/ItemLookUp.aspx`, {
      params: {
        ...req.query,
        TTBKey: process.env.ALADIN_TTB_KEY,
        Output: "JS",
        Version: "20131101",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("ItemLookUp API 요청 실패:", error.message);
    res.status(500).json({ error: "ItemLookUp 요청 실패" });
  }
});

export default router;
