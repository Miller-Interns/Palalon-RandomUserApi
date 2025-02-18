<script setup lang="ts">
import { useUserPagination } from '@/composables/use-users-paganation'
import UserCard from '@/components/user-card.vue'
import PaginationControls from '@/components/paganation-controls.vue'

const userStore = useUserStore()
const router = useRouter()
const { users, loading, fetchUsers } = useFetchUsers()

const selectedGender = ref(userStore.genderFilter)
const currentPage = ref(userStore.currentPage)
const usersPerPage = ref(userStore.usersPerPage)

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * usersPerPage.value
  const end = start + usersPerPage.value
  return userStore.filteredUsers.slice(start, end)
})

const totalPages = computed(() => {
  if (selectedGender.value === 'all') return 10
  return 5
})

const filterByGender = () => {
  userStore.setGenderFilter(selectedGender.value)
  currentPage.value = 1
  refreshList()
}

const refreshList = async () => {
  await fetchUsers(
    50,
    selectedGender.value === 'all' ? '' : selectedGender.value
  )
  userStore.setUsers(users.value)
}

const viewDetails = (index: number) => {
  router.push(`/user/${index}`)
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

onMounted(async () => {
  if (userStore.users.length === 0) {
    await refreshList()
  }
})

watch([selectedGender, currentPage], () => {
  userStore.setCurrentPage(currentPage.value)
  userStore.setGenderFilter(selectedGender.value)
})
</script>

<template>
  <div class="user-list-container">
    <div class="filter-container">
      <label for="gender">Filter by Gender:</label>
      <select
        id="gender"
        v-model="selectedGender"
        @change="filterByGender"
        class="custom-select"
      >
        <option value="all">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>

    <div class="button-container">
      <button @click="refreshList" class="refresh-btn">Refresh List</button>
    </div>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else class="users">
      <div
        v-for="(user, index) in paginatedUsers"
        :key="index"
        class="user-card"
      >
        <UserCard :user="user" @click="viewDetails(index)" />
      </div>

      <!-- Paganation -->
      <PaginationControls
        :currentPage="currentPage"
        :totalPages="totalPages"
        @prev="prevPage"
        @next="nextPage"
      />
    </div>
  </div>
</template>

<style scoped>
.user-list-container {
  font-family: 'Lexend giga', serif;
  text-align: center;
  margin-top: 20px;
  color: #2c3e50;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.filter-container {
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.custom-select {
  padding: 10px;
  font-size: 12px;
  font-weight: bold;
  background-color: #f8f9fa;
  border: 2px solid black;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  outline: none;
}

.button-container {
  margin-bottom: 15px;
}

.refresh-btn {
  font-family: 'Lexend giga', serif;
  padding: 10px 16px;
  font-size: 16px;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  text-transform: uppercase;
}

.refresh-btn:hover {
  background-color: blue;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.page-btn {
  font-family: 'Lexend giga', serif;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
  text-transform: uppercase;
}

.page-btn:disabled {
  background-color: #b0c4de;
  cursor: not-allowed;
}

.page-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.page-info {
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
}

.loading {
  font-size: 18px;
  font-weight: bold;
  color: #0d0d0d;
}
</style>
