import { useQuery } from "@tanstack/react-query";
import authApi from "../utils/authApi";

const fetchLendableBooks = async () => {
  const res = await authApi.get("/borrow/lendables");
  return res.data;
};

export const useLendableBooksQuery = () => {
  return useQuery({
    queryKey: ["books-lendable"],
    queryFn: fetchLendableBooks,
    retry: false, // 토큰 오류 시 무한 재시도 방지
    staleTime: 1000 * 60 * 5,
  });
};
