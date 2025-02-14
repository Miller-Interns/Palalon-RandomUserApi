import { createRouter, createWebHistory } from 'vue-router'
import UserList from '@/views/UserListView.vue'
import UserDetails from '@/components/user-details.vue'
import { RouteNames } from '../enums/route-names'

const routes = [
  { path: '/', name: RouteNames.Home, component: UserList },
  { path: '/user/:id', name: RouteNames.UserDetails, component: UserDetails },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
