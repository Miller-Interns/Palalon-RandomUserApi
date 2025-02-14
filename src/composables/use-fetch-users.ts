import { ref } from "vue";
import type { User } from "@/types/User";

export function useFetchUsers() {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchUsers = async (results = 10, gender = "") => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=${results}&gender=${gender}`
      );
      const data = await response.json();
      users.value = data.results;
    } catch (error) {
      error.value = "Failed to fetch users.";
    } finally {
      loading.value = false;
    }
  };

  return { users, loading, error, fetchUsers };
}