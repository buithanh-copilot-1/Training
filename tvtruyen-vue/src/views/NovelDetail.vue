<template>
  <div class="novel-detail-page">
    <!-- Banner Background -->
    <div class="detail-banner" :style="{ background: novel.gradient }">
      <div class="banner-overlay"></div>
    </div>

    <div class="container">
      <!-- Novel Header Card -->
      <div class="novel-header-card">
        <div class="cover-section">
          <div class="novel-cover" :style="{ background: novel.gradient }">
            <i :class="['fas', novel.icon]"></i>
            <span v-if="novel.badge" :class="['cover-badge', novel.badge]">{{ novel.badgeText }}</span>
          </div>
        </div>

        <div class="info-section">
          <h1 class="novel-title">{{ novel.title }}</h1>

          <div class="meta-list">
            <div class="meta-item">
              <i class="fas fa-user"></i>
              <span class="meta-label">Tác giả:</span>
              <a href="#" class="meta-value">Anonymous</a>
            </div>
            <div class="meta-item">
              <i class="fas fa-list"></i>
              <span class="meta-label">Số chương:</span>
              <span class="meta-value">{{ novel.chapters }} chương</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-eye"></i>
              <span class="meta-label">Lượt xem:</span>
              <span class="meta-value">{{ formatViews(novel.views) }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-tags"></i>
              <span class="meta-label">Thể loại:</span>
              <span class="meta-value category">{{ novel.category }}</span>
            </div>
          </div>

          <div class="action-buttons">
            <router-link :to="`/truyen/${novel.slug}/chuong-1`" class="btn btn-read">
              <i class="fas fa-book-open"></i> Đọc truyện
            </router-link>
            <button class="btn btn-follow">
              <i class="fas fa-heart"></i> Theo dõi
            </button>
            <button class="btn btn-rate">
              <i class="fas fa-star"></i> Đánh giá
            </button>
          </div>
        </div>
      </div>

      <!-- Description Section -->
      <div class="detail-section">
        <h3 class="section-title">
          <i class="fas fa-align-left"></i> Nội dung
        </h3>
        <div class="description-box">
          <p>
            {{ novel.title }} là một câu chuyện thuộc thể loại {{ novel.category }}.
            Truyện mang đến cho người đọc những trải nghiệm đầy thú vị với cốt truyện hấp dẫn,
            nhân vật được xây dựng kỹ lưỡng và chi tiết. Hãy cùng khám phá thế giới tuyệt vời
            trong truyện này.
          </p>
        </div>
      </div>

      <!-- Chapters Section -->
      <div class="detail-section">
        <h3 class="section-title">
          <i class="fas fa-list"></i> Danh sách chương
          <span class="chapter-total">({{ novel.chapters }} chương)</span>
        </h3>

        <div class="chapter-list">
          <router-link
            v-for="i in Math.min(novel.chapters, 20)"
            :key="i"
            :to="`/truyen/${novel.slug}/chuong-${i}`"
            class="chapter-row"
          >
            <span class="chapter-name">Chương {{ i }}</span>
            <span class="chapter-time">{{ i }} giờ trước</span>
          </router-link>
        </div>

        <div class="section-footer">
          <button class="btn btn-view-all">
            Xem tất cả {{ novel.chapters }} chương
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { novels, formatViews } from '../data/novels.js'

export default {
  name: 'NovelDetail',
  setup() {
    const route = useRoute()
    const novel = computed(() => {
      const slug = route.params.slug
      return novels.find(n => n.slug === slug) || novels[0]
    })

    return { novel, formatViews, Math }
  }
}
</script>

<style scoped>
.novel-detail-page {
  min-height: 100vh;
  background: var(--bg-light);
  padding-bottom: 50px;
}

/* Banner */
.detail-banner {
  height: 280px;
  position: relative;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
}

/* Header Card */
.novel-header-card {
  display: flex;
  gap: 30px;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-top: -80px;
  position: relative;
  z-index: 10;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  margin-left: 15px;
  margin-right: 15px;
}

.cover-section {
  flex-shrink: 0;
}

.novel-cover {
  width: 200px;
  height: 280px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: #fff;
  position: relative;
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.cover-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
}

.cover-badge.hot { background: #ff4757; }
.cover-badge.vip { background: #ffd700; color: #333; }
.cover-badge.full { background: #2ed573; }

/* Info Section */
.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.novel-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 16px;
  line-height: 1.3;
}

.meta-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.meta-item i {
  width: 20px;
  color: var(--primary-color);
}

.meta-label {
  color: var(--text-muted);
}

.meta-value {
  color: var(--text-color);
  font-weight: 500;
}

.meta-value.category {
  background: #e3f2fd;
  color: #1976d2;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  text-transform: capitalize;
}

.meta-item a.meta-value {
  color: var(--primary-color);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-read {
  background: var(--primary-color);
  color: #fff;
}

.btn-read:hover {
  background: var(--primary-dark);
}

.btn-follow, .btn-rate {
  background: #f5f5f5;
  color: var(--text-color);
}

.btn-follow:hover, .btn-rate:hover {
  background: #eee;
}

/* Detail Sections */
.detail-section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin: 20px 15px 0;
  box-shadow: var(--shadow);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-title i {
  color: var(--primary-color);
}

.chapter-total {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-muted);
}

/* Description */
.description-box {
  background: #fafafa;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
}

.description-box p {
  color: var(--text-light);
  line-height: 1.8;
  font-size: 15px;
}

/* Chapter List */
.chapter-list {
  display: flex;
  flex-direction: column;
}

.chapter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f0;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.2s ease;
}

.chapter-row:hover {
  background: #fff5f5;
  color: var(--primary-color);
  padding-left: 20px;
}

.chapter-row:last-child {
  border-bottom: none;
}

.chapter-name {
  font-weight: 500;
}

.chapter-time {
  font-size: 13px;
  color: var(--text-muted);
}

.section-footer {
  text-align: center;
  margin-top: 20px;
}

.btn-view-all {
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  padding: 12px 30px;
}

.btn-view-all:hover {
  background: var(--primary-color);
  color: #fff;
}

/* Responsive */
@media (max-width: 768px) {
  .detail-banner {
    height: 180px;
  }

  .novel-header-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: -60px;
    padding: 20px;
  }

  .novel-cover {
    width: 160px;
    height: 220px;
    font-size: 45px;
  }

  .novel-title {
    font-size: 22px;
  }

  .meta-list {
    align-items: center;
  }

  .action-buttons {
    justify-content: center;
    flex-wrap: wrap;
  }

  .detail-section {
    margin: 15px;
    padding: 16px;
  }
}
</style>
