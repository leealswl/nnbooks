import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchBook = (query, categoryId, page = 1, size = 20) => {
  const params = {
    Query: query,
    QueryType: "Keyword",
    MaxResults: size,
    start: (page - 1) * size + 1,
    SearchTarget: "Book",
    Cover: "MidBig",
  };

  if (categoryId) {
    params.CategoryId = categoryId;
  }

  return api.get("/ItemSearch.aspx", { params });
};

export default function useSearchBook(query, categoryId, page = 1, size = 20) {
  return useQuery({
    queryKey: ["book-search", query, categoryId, page, size],
    queryFn: () => fetchSearchBook(query, categoryId, page, size),
    select: (result) => result.data.item,
    enabled: !!query,
    keepPreviousData: true,
  });
}
