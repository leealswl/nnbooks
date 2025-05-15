import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApi from "../utils/authApi";

export const useLocationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLocation) =>
      authApi.patch("/auth/location", { location: newLocation }),
    onSuccess: () => {
      queryClient.invalidateQueries(["myInfo"]); // 내 정보 다시 불러오기
    },
  });
};
