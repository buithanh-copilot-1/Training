<template>
  <section class="section">
    <div class="section-title">
      <h2><i class="fas fa-trophy"></i> Bảng Xếp Hạng</h2>
    </div>
    <div class="ranking-section">
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['tab', { active: activeTab === tab.key }]"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="tab-content" :class="{ active: activeTab === 'day' }">
        <ul class="ranking-list">
          <li v-for="(item, index) in rankings.day" :key="index" class="ranking-item">
            <span class="ranking-number">{{ index + 1 }}</span>
            <div class="ranking-cover" :style="{ background: item.gradient }"></div>
            <div class="ranking-info">
              <h4>{{ item.title }}</h4>
              <p>{{ formatViews(item.views) }} lượt xem</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="tab-content" :class="{ active: activeTab === 'week' }">
        <ul class="ranking-list">
          <li v-for="(item, index) in rankings.week" :key="index" class="ranking-item">
            <span class="ranking-number">{{ index + 1 }}</span>
            <div class="ranking-cover" :style="{ background: item.gradient }"></div>
            <div class="ranking-info">
              <h4>{{ item.title }}</h4>
              <p>{{ formatViews(item.views) }} lượt xem</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="tab-content" :class="{ active: activeTab === 'month' }">
        <ul class="ranking-list">
          <li v-for="(item, index) in rankings.month" :key="index" class="ranking-item">
            <span class="ranking-number">{{ index + 1 }}</span>
            <div class="ranking-cover" :style="{ background: item.gradient }"></div>
            <div class="ranking-info">
              <h4>{{ item.title }}</h4>
              <p>{{ formatViews(item.views) }} lượt xem</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { rankings, formatViews } from '../data/novels.js'

export default {
  name: 'RankingSection',
  setup() {
    const activeTab = ref('day')
    const tabs = [
      { key: 'day', label: 'Ngày' },
      { key: 'week', label: 'Tuần' },
      { key: 'month', label: 'Tháng' }
    ]

    return {
      activeTab,
      tabs,
      rankings,
      formatViews
    }
  }
}
</script>
