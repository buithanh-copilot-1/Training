<template>
  <div class="translator-page">
    <div class="page-header">
      <h1><i class="fas fa-users"></i> Nhóm Dịch</h1>
    </div>
    <div class="group-list">
      <div v-for="group in groups" :key="group.id" class="group-card">
        <div class="group-avatar" :style="{ background: group.gradient }">
          <i class="fas fa-users"></i>
        </div>
        <div class="group-info">
          <h3>{{ group.name }}</h3>
          <p>{{ group.description }}</p>
          <div class="group-stats">
            <span><i class="fas fa-book"></i> {{ group.novels }} truyện</span>
            <span><i class="fas fa-user"></i> {{ group.members }} thành viên</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TranslatorGroup',
  setup() {
    const groups = ref([
      { id: 1, name: 'Nhóm Dịch A', description: 'Chuyên dịch ngôn tình', novels: 15, members: 5, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      { id: 2, name: 'Nhóm Dịch B', description: 'Chuyên dịch tiên hiệp', novels: 10, members: 3, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
      { id: 3, name: 'Nhóm Dịch C', description: 'Chuyên dịch đam mỹ', novels: 8, members: 4, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
    ])
    return { groups }
  }
}
</script>

<style scoped>
.page-header { margin: 20px 0; padding: 15px 0; border-bottom: 2px solid var(--primary-color); }
.page-header h1 { color: var(--primary-color); font-size: 24px; display: flex; align-items: center; gap: 10px; }
.group-list { display: grid; gap: 20px; }
.group-card { display: flex; gap: 20px; padding: 20px; background: #fff; border-radius: 8px; box-shadow: var(--shadow); }
.group-avatar { width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; color: #fff; flex-shrink: 0; }
.group-info { flex: 1; }
.group-info h3 { margin-bottom: 8px; color: var(--text-color); }
.group-info p { color: var(--text-light); margin-bottom: 10px; }
.group-stats { display: flex; gap: 20px; color: var(--text-muted); font-size: 14px; }
.group-stats i { margin-right: 5px; }
@media (max-width: 768px) { .group-card { flex-direction: column; align-items: center; text-align: center; } .group-stats { justify-content: center; } }
</style>
