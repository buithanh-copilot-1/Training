<template>
  <div class="author-page">
    <div class="page-header">
      <h1><i class="fas fa-pen"></i> Tác Giả: {{ authorName }}</h1>
    </div>
    <div class="author-info">
      <p>Tác giả {{ authorName }} là một trong những tác giả được yêu thích nhất với nhiều tác phẩm nổi tiếng.</p>
    </div>
    <div class="novel-list">
      <NovelCard v-for="novel in authorNovels" :key="novel.id" :novel="novel" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NovelCard from '../components/NovelCard.vue'
import { novels } from '../data/novels.js'

export default {
  name: 'Author',
  components: { NovelCard },
  setup() {
    const route = useRoute()
    const authorName = computed(() => {
      const slug = route.params.slug
      return slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown'
    })
    const authorNovels = computed(() => novels.slice(0, 6))
    return { authorName, authorNovels }
  }
}
</script>

<style scoped>
.page-header { margin: 20px 0; padding: 15px 0; border-bottom: 2px solid var(--primary-color); }
.page-header h1 { color: var(--primary-color); font-size: 24px; display: flex; align-items: center; gap: 10px; }
.author-info { background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: var(--shadow); }
.author-info p { color: var(--text-light); line-height: 1.8; }
</style>
