<template>
  <div class="novel-list-page">
    <div class="page-header">
      <h1><i class="fas fa-list"></i> {{ title }}</h1>
    </div>
    <div class="filter-bar">
      <select v-model="sortBy">
        <option value="newest">Mới nhất</option>
        <option value="views">Lượt xem</option>
        <option value="chapters">Số chương</option>
      </select>
    </div>
    <div class="novel-list">
      <NovelCard v-for="novel in filteredNovels" :key="novel.id" :novel="novel" />
    </div>
    <div class="pagination">
      <button class="page-btn" disabled><i class="fas fa-chevron-left"></i></button>
      <button class="page-btn active">1</button>
      <button class="page-btn">2</button>
      <button class="page-btn">3</button>
      <button class="page-btn"><i class="fas fa-chevron-right"></i></button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import NovelCard from '../components/NovelCard.vue'
import { novels } from '../data/novels.js'

export default {
  name: 'NovelList',
  components: { NovelCard },
  props: {
    title: { type: String, default: 'Danh Sách Truyện' },
    filter: { type: String, default: '' },
    chapters: { type: String, default: '' }
  },
  setup(props) {
    const sortBy = ref('newest')

    const filteredNovels = computed(() => {
      let result = [...novels]

      if (props.filter) {
        result = result.filter(n => n.badge === props.filter)
      }

      if (props.chapters) {
        if (props.chapters === '0-100') {
          result = result.filter(n => n.chapters < 100)
        } else if (props.chapters === '100-500') {
          result = result.filter(n => n.chapters >= 100 && n.chapters <= 500)
        } else if (props.chapters === '500-1000') {
          result = result.filter(n => n.chapters > 500 && n.chapters <= 1000)
        } else if (props.chapters === '1000+') {
          result = result.filter(n => n.chapters > 1000)
        }
      }

      return result
    })

    return { sortBy, filteredNovels }
  }
}
</script>

<style scoped>
.page-header {
  margin: 20px 0;
  padding: 15px 0;
  border-bottom: 2px solid var(--primary-color);
}

.page-header h1 {
  color: var(--primary-color);
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
}

.filter-bar select {
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 30px 0;
}

.page-btn {
  padding: 8px 15px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

.page-btn.active {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
