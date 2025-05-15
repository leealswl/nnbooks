import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchBookList = () => {
  return api.get("/ItemList.aspx", {
    params: {
      QueryType: "Bestseller",
      MaxResults: 100,
      start: 1,
      SearchTarget: "Book",
      Cover: "MidBig",
    },
  });
};

export default function useBooks() {
  return useQuery({
    queryKey: ["bookList"],
    queryFn: fetchBookList,
    select: (result) =>
      Array.isArray(result?.data?.item) ? result.data.item : [],
  });
}
