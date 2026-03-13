<template>
  <div class="home-page">
    <Banner />
    <NovelCarousel title="Truyện Hot" icon="fa-fire" :novels="hotNovels" />
    <NovelCarousel title="Truyện Độc Quyền" icon="fa-star" :novels="exclusiveNovels" />
    <RankingSection />
    <CategorySection />
    <NovelSection title="Truyện Mới Cập Nhật" icon="fa-clock" :novels="newUpdates" />
    <NovelSection title="Truyện Đã Hoàn Thành" icon="fa-check-circle" :novels="completedNovels" />
  </div>
</template>

<script>
import { computed } from 'vue'
import Banner from '../components/Banner.vue'
import NovelCarousel from '../components/NovelCarousel.vue'
import RankingSection from '../components/RankingSection.vue'
import CategorySection from '../components/CategorySection.vue'
import NovelSection from '../components/NovelSection.vue'
import { novels } from '../data/novels.js'

export default {
  name: 'Home',
  components: {
    Banner,
    NovelCarousel,
    RankingSection,
    CategorySection,
    NovelSection
  },
  setup() {
    const hotNovels = computed(() => novels.filter(n => n.badge === 'hot'))
    const exclusiveNovels = computed(() => novels.filter(n => n.badge === 'vip'))
    const newUpdates = computed(() => novels.filter(n => n.updateTime))
    const completedNovels = computed(() => novels.filter(n => n.badge === 'full'))

    return {
      hotNovels,
      exclusiveNovels,
      newUpdates,
      completedNovels
    }
  }
}
</script>
