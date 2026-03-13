<template>
  <section class="section">
    <div class="section-title">
      <h2><i class="fas fa-tags"></i> Thể Loại Truyện</h2>
    </div>
    <div class="category-grid">
      <div v-for="(category, index) in categories" :key="index" class="category-item">
        <i :class="['fas', category.icon]"></i>
        <h4>{{ category.name }}</h4>
      </div>
    </div>
  </section>
</template>

<script>
import { categories } from '../data/novels.js'

export default {
  name: 'CategorySection',
  setup() {
    return {
      categories
    }
  }
}
</script>
