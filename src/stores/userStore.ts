import { defineStore } from 'pinia'
import type { User } from '@/types/User'

// TODO move this to its own file
interface UserState {
  users: User[]
  genderFilter: string
  currentPage: number
  usersPerPage: number
}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    users: [],
    genderFilter: 'all', // TODO use enums
    currentPage: 1,
    usersPerPage: 5,
  }),

  getters: {
    filteredUsers(state): User[] {
      if (state.genderFilter === 'all') return state.users // TODO use enums
      return state.users.filter((user) => user.gender === state.genderFilter)
    },

    totalPages(): number {
      return Math.ceil(this.filteredUsers.length / this.usersPerPage) || 1
    },

    totalUsers(): number {
      return this.filteredUsers.length
    },
  },

  actions: {
    setUsers(users: User[]) {
      this.users = users
    },

    setGenderFilter(gender: string) {
      this.genderFilter = gender
    },

    setCurrentPage(page: number) {
      this.currentPage = page
    },
  },
})
