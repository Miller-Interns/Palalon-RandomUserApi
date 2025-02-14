<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const userId = route.params.id as string
const user = computed(() =>
  userStore.users.find((_, index) => index.toString() === userId)
)

const fullName = computed(
  () => `${user.value?.name.first} ${user.value?.name.last}`
)
const userLocation = computed(() => {
  if (!user.value) return ''
  const { street, city, state, country } = user.value.location
  return `${street.number} ${street.name}, ${city}, ${state}, ${country}`
})

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div v-if="user">
    <h2>{{ fullName }}</h2>
    <img :src="user.picture.large" :alt="fullName" />
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Gender:</strong> {{ user.gender }}</p>
    <p><strong>Location:</strong> {{ userLocation }}</p>
    <button @click="goBack">Back to List</button>
  </div>
</template>

<style scoped>
img {
  border-radius: 50%;
}
button {
  font-family: 'Lexend giga', serif;
  margin-top: 20px;
}
</style>
