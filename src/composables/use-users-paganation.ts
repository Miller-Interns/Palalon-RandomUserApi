import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useFetchUsers } from '@/composables/use-fetch-users'

export function useUserPagination() {
  const userStore = useUserStore()
  const router = useRouter()
  const { users, loading, fetchUsers } = useFetchUsers() // Include loading here

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

  return {
    selectedGender,
    currentPage,
    paginatedUsers,
    totalPages,
    filterByGender,
    refreshList,
    viewDetails,
    prevPage,
    nextPage,
    loading, 
  }
}
