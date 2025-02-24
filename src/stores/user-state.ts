import type { User } from '@/types/User'
import { Gender } from '@/enums/gender'

export interface UserState {
  users: User[]
  genderFilter: Gender
  currentPage: number
  usersPerPage: number
}
