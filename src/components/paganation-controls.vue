<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  currentPage: Number,
  totalPages: Number,
})

const emit = defineEmits(['prev', 'next'])
</script>

<template>
  <div class="pagination">
    <button
      @click="emit('prev')"
      :disabled="currentPage === 1"
      class="page-btn"
    >
      Previous
    </button>
    <span class="page-info"> Page {{ currentPage }} of {{ totalPages }} </span>
    <button
      @click="emit('next')"
      :disabled="currentPage >= totalPages"
      class="page-btn"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.page-btn {
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
</style>
