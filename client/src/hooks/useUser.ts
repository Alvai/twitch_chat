import { useMutation, useQuery, useQueryClient } from "react-query";

const USER_LOCAL_STORAGE_KEY = "username";

// Notes: Local storage auth could be replaced easily by a real auth system

export const useUser = () => {
  return useQuery(["user"], {
    queryFn: () => localStorage.getItem(USER_LOCAL_STORAGE_KEY),
  });
};

export const useUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, string | null>({
    mutationFn: async (newUsername) => {
      if (newUsername) {
        localStorage.setItem(USER_LOCAL_STORAGE_KEY, newUsername);
      } else {
        localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
      }

      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
