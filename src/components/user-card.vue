<script setup lang="ts">
import type { User } from '@/types/User'

defineProps<{ user: User }>()
</script>

<template>
  <div class="user-card">
    <img
      :src="user.picture.thumbnail"
      :alt="`${user.name.first} ${user.name.last}`"
    />
    <h3>{{ user.name.first }} {{ user.name.last }}</h3>
  </div>
</template>

<style scoped>
.user-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px;
  text-align: center;
}
</style>
