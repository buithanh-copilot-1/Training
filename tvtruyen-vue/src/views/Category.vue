<template>
  <div class="category-page">
    <div class="page-header">
      <h1><i class="fas fa-tags"></i> {{ categoryName }}</h1>
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
      <button class="page-btn"><i class="fas fa-chevron-right"></i></button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import NovelCard from '../components/NovelCard.vue'
import { novels } from '../data/novels.js'

export default {
  name: 'Category',
  components: { NovelCard },
  setup() {
    const route = useRoute()
    const sortBy = ref('newest')

    const categoryName = computed(() => {
      const slug = route.params.slug
      const categoryMap = {
        'ngon-tinh': 'Ngôn Tình',
        'dong-nhan': 'Đồng Nhân',
        'dam-my': 'Đam Mỹ',
        'tien-hiep': 'Tiên Hiệp',
        'huyen-huyen': 'Huyền Huyễn',
        'trong-sinh': 'Trọng Sinh',
        'xuyen-khong': 'Xuyên Không',
        'co-dai': 'Cổ Đại',
        'kiem-hiep': 'Kiếm Hiệp',
        'do-thi': 'Đô Thị',
        'mat-the': 'Mạt Thế',
        'quan-su': 'Quân Sự'
      }
      return categoryMap[slug] || 'Thể Loại'
    })

    const filteredNovels = computed(() => {
      return novels.filter(n => n.category === route.params.slug)
    })

    return { sortBy, categoryName, filteredNovels }
  }
}
</script>

<style scoped>
.page-header { margin: 20px 0; padding: 15px 0; border-bottom: 2px solid var(--primary-color); }
.page-header h1 { color: var(--primary-color); font-size: 24px; display: flex; align-items: center; gap: 10px; }
.filter-bar { margin-bottom: 20px; }
.filter-bar select { padding: 8px 15px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px; cursor: pointer; }
.pagination { display: flex; justify-content: center; gap: 8px; margin: 30px 0; }
.page-btn { padding: 8px 15px; border: 1px solid #ddd; background: #fff; border-radius: 5px; cursor: pointer; transition: all 0.3s; }
.page-btn:hover:not(:disabled) { background: var(--primary-color); color: #fff; border-color: var(--primary-color); }
.page-btn.active { background: var(--primary-color); color: #fff; border-color: var(--primary-color); }
.page-btn:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
