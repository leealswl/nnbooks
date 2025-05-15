import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchBookByID = (bookID) => {
  return api.get("/ItemLookUp.aspx", {
    params: {
      ItemIdType: "ItemID",
      ItemId: bookID,
      Cover: "Big",
      OptResult: "ratingInfo, packing",
    },
  });
};

export default function useBookByID(bookID) {
  return useQuery({
    queryKey: ["bookByID", bookID],
    queryFn: () => fetchBookByID(bookID),
    select: (result) => {
      if (!result || !result.data || !Array.isArray(result.data.item))
        return null;
      return result.data.item[0] || null;
    },
    enabled: !!bookID,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
}
