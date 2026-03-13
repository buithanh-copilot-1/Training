<template>
  <router-link :to="`/truyen/${novel.slug}`" class="novel-card" :data-id="novel.id">
    <div class="novel-cover" :style="{ background: novel.gradient }">
      <i :class="['fas', novel.icon]"></i>
      <span v-if="novel.badge" :class="['novel-badge', novel.badge]">{{ novel.badgeText }}</span>
    </div>
    <div class="novel-info">
      <h3 class="novel-title">{{ novel.title }}</h3>
      <div class="novel-meta">
        <span class="novel-chapters"><i class="fas fa-list"></i> {{ novel.chapters }} chương</span>
        <span class="novel-views"><i class="fas fa-eye"></i> {{ formatViews(novel.views) }}</span>
      </div>
      <div v-if="novel.updateTime" class="novel-update">
        <i class="fas fa-clock"></i> {{ novel.updateTime }}
      </div>
    </div>
  </router-link>
</template>

<script>
import { formatViews } from '../data/novels.js'

export default {
  name: 'NovelCard',
  props: {
    novel: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      formatViews
    }
  }
}
</script>
