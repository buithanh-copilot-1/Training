<template>
  <section class="section">
    <div class="section-title">
      <h2><i :class="['fas', icon]"></i> {{ title }}</h2>
      <a href="#" class="view-all">Xem tất cả <i class="fas fa-chevron-right"></i></a>
    </div>
    <div class="novel-list">
      <NovelCard v-for="novel in novels" :key="novel.id" :novel="novel" />
    </div>
  </section>
</template>

<script>
import NovelCard from './NovelCard.vue'

export default {
  name: 'NovelSection',
  components: {
    NovelCard
  },
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    novels: {
      type: Array,
      required: true
    }
  }
}
</script>
