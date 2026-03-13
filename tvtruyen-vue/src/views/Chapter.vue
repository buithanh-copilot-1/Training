<template>
  <div class="chapter-page" :style="readingSettings">
    <!-- Settings Toggle Button -->
    <button type="button" class="settings-toggle" @click="showSettings = !showSettings" title="Cài đặt đọc truyện" style="display: flex !important;">
      <span class="settings-icon">⚙️</span>
    </button>

    <!-- Settings Panel -->
    <div class="settings-panel" :class="{ active: showSettings }">
      <div class="settings-header">
        <h3><i class="fas fa-cog"></i> Cài đặt đọc</h3>
        <button class="close-btn" @click="showSettings = false">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="settings-content">
        <!-- Font Size -->
        <div class="setting-item">
          <label>Cỡ chữ: <span class="setting-value">{{ fontSizeValue }}</span></label>
          <input
            type="range"
            min="12"
            max="32"
            :value="fontSizeValue"
            @input="updateFontSize($event.target.value)"
            class="setting-slider"
          >
          <div class="slider-labels">
            <span>Nhỏ</span>
            <span>Lớn</span>
          </div>
        </div>

        <!-- Font Family -->
        <div class="setting-item">
          <label>Font chữ</label>
          <select v-model="settings.fontFamily" class="setting-select">
            <option value="'Segoe UI', sans-serif">Segoe UI</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Arial', sans-serif">Arial</option>
            <option value="'Roboto', sans-serif">Roboto</option>
            <option value="'Merriweather', serif">Merriweather</option>
          </select>
        </div>

        <!-- Line Height -->
        <div class="setting-item">
          <label>Giãn dòng: <span class="setting-value">{{ lineHeightValue }}</span></label>
          <input
            type="range"
            min="1.2"
            max="3"
            step="0.1"
            :value="lineHeightValue"
            @input="updateLineHeight($event.target.value)"
            class="setting-slider"
          >
          <div class="slider-labels">
            <span>Thường</span>
            <span>Rộng</span>
          </div>
        </div>

        <!-- Background Theme -->
        <div class="setting-item">
          <label>Màu nền</label>
          <div class="theme-options">
            <button
              v-for="theme in themes"
              :key="theme.name"
              :class="['theme-btn', { active: settings.background === theme.value }]"
              :style="{ background: theme.value }"
              @click="settings.background = theme.value"
              :title="theme.name"
            ></button>
          </div>
        </div>

        <!-- Text Color -->
        <div class="setting-item">
          <label>Màu chữ</label>
          <div class="theme-options">
            <button
              v-for="color in textColors"
              :key="color.name"
              :class="['color-btn', { active: settings.textColor === color.value }]"
              :style="{ background: color.value }"
              @click="settings.textColor = color.value"
              :title="color.name"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <div class="settings-overlay" :class="{ active: showSettings }" @click="showSettings = false"></div>

    <!-- Chapter Header -->
    <div class="chapter-header">
      <router-link :to="`/truyen/${slug}`" class="back-link">
        <i class="fas fa-arrow-left"></i> Quay lại
      </router-link>
      <h1>{{ novelTitle }} - Chương {{ chapter }}</h1>
    </div>

    <!-- Chapter Navigation -->
    <div class="chapter-nav">
      <button class="nav-btn" :disabled="parseInt(chapter) <= 1">Chương trước</button>
      <select v-model="currentChapter" @change="goToChapter">
        <option v-for="i in 50" :key="i" :value="i">Chương {{ i }}</option>
      </select>
      <button class="nav-btn" :disabled="parseInt(chapter) >= 50">Chương sau</button>
    </div>

    <!-- Chapter Content -->
    <div class="chapter-content">
      <h2 class="chapter-title">Chương {{ chapter }}</h2>
      <div class="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>

        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>

        <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>

        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>

        <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>

        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.</p>
      </div>
    </div>

    <!-- Chapter Navigation Bottom -->
    <div class="chapter-nav bottom">
      <button class="nav-btn" :disabled="parseInt(chapter) <= 1">Chương trước</button>
      <button class="nav-btn" :disabled="parseInt(chapter) >= 50">Chương sau</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'Chapter',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const showSettings = ref(false)

    const slug = computed(() => route.params.slug)
    const chapter = computed(() => route.params.chapter)
    const novelTitle = computed(() => 'Tiên Ma Đích Luyến')
    const currentChapter = ref(parseInt(chapter.value) || 1)

    // Default settings
    const defaultSettings = {
      fontSize: '18px',
      fontFamily: "'Segoe UI', sans-serif",
      lineHeight: '1.8',
      background: '#ffffff',
      textColor: '#333333'
    }

    const settings = ref({ ...defaultSettings })

    const themes = [
      { name: 'Trắng', value: '#ffffff' },
      { name: 'Sepia', value: '#f4ecd8' },
      { name: 'Xanh da trời', value: '#e3f2fd' },
      { name: 'Xanh lá', value: '#e8f5e9' },
      { name: 'Hồng', value: '#fce4ec' },
      { name: 'Tối', value: '#1a1a1a' },
      { name: 'Xanh đậm', value: '#1a237e' },
      { name: 'Nâu', value: '#3e2723' }
    ]

    const textColors = [
      { name: 'Đen', value: '#333333' },
      { name: 'Xám', value: '#666666' },
      { name: 'Nâu', value: '#5d4037' },
      { name: 'Trắng', value: '#ffffff' },
      { name: 'Xanh', value: '#1565c0' }
    ]

    // Computed reading styles
    const readingSettings = computed(() => ({
      '--font-size': settings.value.fontSize,
      '--font-family': settings.value.fontFamily,
      '--line-height': settings.value.lineHeight,
      '--bg-color': settings.value.background,
      '--text-color': settings.value.textColor
    }))

    // Computed values for display
    const fontSizeValue = computed(() => parseInt(settings.value.fontSize))
    const lineHeightValue = computed(() => parseFloat(settings.value.lineHeight))

    // Slider update functions
    const updateFontSize = (value) => {
      settings.value.fontSize = value + 'px'
    }

    const updateLineHeight = (value) => {
      settings.value.lineHeight = parseFloat(value).toFixed(1)
    }

    // Font size controls
    const increaseFontSize = () => {
      const current = parseInt(settings.value.fontSize)
      if (current < 32) {
        settings.value.fontSize = (current + 2) + 'px'
      }
    }

    const decreaseFontSize = () => {
      const current = parseInt(settings.value.fontSize)
      if (current > 12) {
        settings.value.fontSize = (current - 2) + 'px'
      }
    }

    // Line height controls
    const increaseLineHeight = () => {
      const current = parseFloat(settings.value.lineHeight)
      if (current < 3) {
        settings.value.lineHeight = (current + 0.2).toFixed(1)
      }
    }

    const decreaseLineHeight = () => {
      const current = parseFloat(settings.value.lineHeight)
      if (current > 1.2) {
        settings.value.lineHeight = (current - 0.2).toFixed(1)
      }
    }

    // Save to localStorage
    watch(settings, (newSettings) => {
      localStorage.setItem('readingSettings', JSON.stringify(newSettings))
    }, { deep: true })

    // Load from localStorage
    onMounted(() => {
      const saved = localStorage.getItem('readingSettings')
      if (saved) {
        settings.value = { ...defaultSettings, ...JSON.parse(saved) }
      }
    })

    const goToChapter = () => {
      router.push(`/truyen/${slug.value}/chuong-${currentChapter.value}`)
    }

    return {
      slug,
      chapter,
      novelTitle,
      currentChapter,
      goToChapter,
      showSettings,
      settings,
      readingSettings,
      fontSizeValue,
      lineHeightValue,
      themes,
      textColors,
      updateFontSize,
      updateLineHeight,
      increaseFontSize,
      decreaseFontSize,
      increaseLineHeight,
      decreaseLineHeight
    }
  }
}
</script>

<style scoped>
.chapter-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background-color: var(--bg-color);
  transition: background-color 0.3s ease;
}

/* Settings Toggle */
.settings-toggle {
  position: fixed !important;
  top: 100px !important;
  right: 20px !important;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ed3849 !important;
  color: #fff !important;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  z-index: 9999 !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: all 0.3s ease;
}

.settings-icon {
  line-height: 1;
}

.settings-toggle:hover {
  transform: rotate(90deg);
  background: #c62828 !important;
}

/* Settings Overlay */
.settings-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 200;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.settings-overlay.active {
  display: block;
  opacity: 1;
}

/* Settings Panel */
.settings-panel {
  position: fixed;
  top: 0;
  right: -350px;
  width: 350px;
  max-width: 90%;
  height: 100vh;
  background: #fff;
  z-index: 300;
  transition: right 0.3s ease;
  box-shadow: -5px 0 25px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
}

.settings-panel.active {
  right: 0;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.settings-header h3 {
  font-size: 18px;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 10px;
}

.settings-header h3 i {
  color: var(--primary-color);
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #eee;
}

.settings-content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.setting-item {
  margin-bottom: 24px;
}

.setting-item label {
  display: block;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
  font-size: 14px;
}

.setting-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.control-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: var(--primary-color);
  color: #fff;
}

.setting-value {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-color);
  min-width: 50px;
  text-align: center;
}

.setting-slider {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #ddd;
  outline: none;
  -webkit-appearance: none;
  margin: 10px 0;
}

.setting-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.setting-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
  border: none;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 5px;
}

.setting-select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.theme-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.theme-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-btn:hover {
  transform: scale(1.1);
}

.theme-btn.active {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(237,56,73,0.3);
}

.color-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-btn:hover {
  transform: scale(1.1);
}

.color-btn.active {
  border-color: var(--primary-color);
}

/* Chapter Header */
.chapter-header {
  margin-bottom: 20px;
}

.back-link {
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  text-decoration: none;
  font-weight: 500;
}

.chapter-header h1 {
  font-size: 20px;
  color: var(--text-color);
  font-weight: 600;
}

/* Chapter Navigation */
.chapter-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

.chapter-nav.bottom {
  margin-top: 30px;
  margin-bottom: 50px;
}

.chapter-nav select {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.nav-btn {
  padding: 10px 20px;
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  background: var(--primary-dark);
}

.nav-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Chapter Content */
.chapter-content {
  background: var(--bg-color);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.08);
}

.chapter-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
  color: var(--primary-color);
  font-weight: 700;
}

.content p {
  margin-bottom: 20px;
  line-height: var(--line-height);
  color: var(--text-color);
  text-align: justify;
  font-size: var(--font-size);
  font-family: var(--font-family);
}

/* Responsive */
@media (max-width: 768px) {
  .settings-toggle {
    top: 80px !important;
    right: 15px !important;
    width: 45px;
    height: 45px;
  }

  .chapter-nav {
    flex-direction: column;
  }

  .chapter-nav select {
    width: 100%;
  }

  .chapter-content {
    padding: 20px;
  }

  .chapter-title {
    font-size: 20px;
  }

  .content p {
    font-size: calc(var(--font-size) - 2px);
  }
}
</style>