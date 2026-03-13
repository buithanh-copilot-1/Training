<template>
  <div class="search-page">
    <div class="page-header">
      <h1><i class="fas fa-search-plus"></i> Tìm Kiếm Nâng Cao</h1>
    </div>
    <div class="search-form">
      <div class="form-group">
        <label>Từ khóa</label>
        <input type="text" v-model="searchForm.keyword" placeholder="Nhập tên truyện...">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Thể loại</label>
          <select v-model="searchForm.category">
            <option value="">Tất cả</option>
            <option value="ngon-tinh">Ngôn Tình</option>
            <option value="dam-my">Đam Mỹ</option>
            <option value="tien-hiep">Tiên Hiệp</option>
            <option value="huyen-huyen">Huyền Huyễn</option>
            <option value="trong-sinh">Trọng Sinh</option>
            <option value="xuyen-khong">Xuyên Không</option>
          </select>
        </div>
        <div class="form-group">
          <label>Tình trạng</label>
          <select v-model="searchForm.status">
            <option value="">Tất cả</option>
            <option value="full">Full</option>
            <option value="ongoing">Đang viết</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Số chương</label>
          <select v-model="searchForm.chapters">
            <option value="">Tất cả</option>
            <option value="0-100">Dưới 100</option>
            <option value="100-500">100 - 500</option>
            <option value="500-1000">500 - 1000</option>
            <option value="1000+">Trên 1000</option>
          </select>
        </div>
        <div class="form-group">
          <label>Sắp xếp theo</label>
          <select v-model="searchForm.sort">
            <option value="newest">Mới nhất</option>
            <option value="views">Lượt xem</option>
            <option value="chapters">Số chương</option>
          </select>
        </div>
      </div>
      <button class="btn-search" @click="handleSearch">
        <i class="fas fa-search"></i> Tìm kiếm
      </button>
    </div>

    <div class="search-results" v-if="hasSearched">
      <h2>Kết quả tìm kiếm ({{ results.length }} truyện)</h2>
      <div class="novel-list">
        <NovelCard v-for="novel in results" :key="novel.id" :novel="novel" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import NovelCard from '../components/NovelCard.vue'
import { novels } from '../data/novels.js'

export default {
  name: 'Search',
  components: { NovelCard },
  setup() {
    const searchForm = reactive({
      keyword: '',
      category: '',
      status: '',
      chapters: '',
      sort: 'newest'
    })
    const hasSearched = ref(false)
    const results = ref([])

    const handleSearch = () => {
      hasSearched.value = true
      results.value = novels
    }

    return { searchForm, hasSearched, results, handleSearch }
  }
}
</script>

<style scoped>
.page-header { margin: 20px 0; padding: 15px 0; border-bottom: 2px solid var(--primary-color); }
.page-header h1 { color: var(--primary-color); font-size: 24px; display: flex; align-items: center; gap: 10px; }

.search-form { background: #fff; padding: 25px; border-radius: 8px; box-shadow: var(--shadow); margin-bottom: 30px; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 500; color: var(--text-color); }
.form-group input, .form-group select { width: 100%; padding: 10px 15px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.btn-search { width: 100%; padding: 12px; background: var(--primary-color); color: #fff; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; transition: background 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px; }
.btn-search:hover { background: var(--primary-dark); }

.search-results h2 { margin-bottom: 20px; color: var(--text-color); }

@media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } }
</style>
