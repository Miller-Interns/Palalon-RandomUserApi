import { defineStore } from 'pinia'
import type { User } from '@/types/User'
import type { UserState } from '@/stores/user-state'
import { Gender } from '@/enums/gender' //  Now importing only the enum

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    users: [],
    genderFilter: Gender.All, // Using the import enum
    currentPage: 1,
    usersPerPage: 5,
  }),

  getters: {
    filteredUsers(state): User[] {
      if (state.genderFilter === Gender.All) return state.users
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

    setGenderFilter(gender: Gender) {
      this.genderFilter = gender
    },

    setCurrentPage(page: number) {
      this.currentPage = page
    },
  },
})
