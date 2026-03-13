<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <span class="logo-icon">📚</span>
          <span class="logo-text">TruyenTV</span>
        </router-link>

        <nav class="main-nav">
          <ul class="nav-menu">
            <li class="nav-item">
              <router-link to="/" class="nav-link">
                <span class="nav-icon">📖</span>
                <span class="nav-text">Danh sách</span>
              </router-link>
            </li>
            <li class="nav-item has-submenu">
              <a href="#" class="nav-link">
                <span class="nav-icon">🏷️</span>
                <span class="nav-text">Thể loại</span>
                <span class="nav-arrow">▾</span>
              </a>
              <ul class="submenu">
                <li><router-link to="/the-loai/ngon-tinh">Ngôn tình</router-link></li>
                <li><router-link to="/the-loai/kiem-hiep">Kiếm hiệp</router-link></li>
                <li><router-link to="/the-loai/tien-hiep">Tiên hiệp</router-link></li>
                <li><router-link to="/the-loai/nguoc">Ngược</router-link></li>
                <li><router-link to="/the-loai/xuyen-khong">Xuyên không</router-link></li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link to="/truyen-hot" class="nav-link">
                <span class="nav-icon">🔥</span>
                <span class="nav-text">Phân loại</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/nhom-dich" class="nav-link">
                <span class="nav-icon">👥</span>
                <span class="nav-text">Nhóm dịch</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/tim-kiem-nang-cao" class="nav-link">
                <span class="nav-icon">🔍</span>
                <span class="nav-text">Tìm kiếm</span>
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="header-actions">
          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Tìm kiếm truyện..."
              @keyup.enter="handleSearch"
            >
            <button class="search-btn" @click="handleSearch">
              <i class="fas fa-search"></i>
            </button>
          </div>
          <button class="user-btn">
            <i class="fas fa-user"></i>
          </button>
          <button class="mobile-menu-toggle" @click="toggleMobileMenu">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-overlay" :class="{ active: isMobileMenuOpen }" @click="toggleMobileMenu"></div>
    <div class="mobile-menu" :class="{ active: isMobileMenuOpen }">
      <div class="mobile-menu-header">
        <router-link to="/" class="logo">
          <span class="logo-icon">📚</span>
          <span class="logo-text">TruyenTV</span>
        </router-link>
        <button class="close-btn" @click="toggleMobileMenu">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="mobile-search">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Tìm kiếm truyện..."
          @keyup.enter="handleSearch"
        >
        <button @click="handleSearch"><i class="fas fa-search"></i></button>
      </div>
      <ul class="mobile-nav-menu">
        <li>
          <router-link to="/" @click="toggleMobileMenu">
            <span class="menu-icon">📖</span> Danh sách truyện
          </router-link>
        </li>
        <li class="mobile-has-submenu">
          <a href="#" @click.prevent="toggleMobileSubmenu('category')">
            <span class="menu-icon">🏷️</span> Thể loại
            <span class="menu-arrow">▾</span>
          </a>
          <ul class="mobile-submenu" v-if="mobileSubmenuOpen.category">
            <li><router-link to="/the-loai/ngon-tinh" @click="toggleMobileMenu">Ngôn tình</router-link></li>
            <li><router-link to="/the-loai/kiem-hiep" @click="toggleMobileMenu">Kiếm hiệp</router-link></li>
            <li><router-link to="/the-loai/tien-hiep" @click="toggleMobileMenu">Tiên hiệp</router-link></li>
            <li><router-link to="/the-loai/nguoc" @click="toggleMobileMenu">Ngược</router-link></li>
            <li><router-link to="/the-loai/xuyen-khong" @click="toggleMobileMenu">Xuyên không</router-link></li>
          </ul>
        </li>
        <li>
          <router-link to="/truyen-hot" @click="toggleMobileMenu">
            <span class="menu-icon">🔥</span> Phân loại
          </router-link>
        </li>
        <li>
          <router-link to="/nhom-dich" @click="toggleMobileMenu">
            <span class="menu-icon">👥</span> Nhóm dịch
          </router-link>
        </li>
        <li>
          <router-link to="/tim-kiem-nang-cao" @click="toggleMobileMenu">
            <span class="menu-icon">🔍</span> Tìm kiếm nâng cao
          </router-link>
        </li>
        <li>
          <a href="#">
            <span class="menu-icon">👤</span> Tài khoản
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AppHeader',
  setup() {
    const searchQuery = ref('')
    const isMobileMenuOpen = ref(false)
    const mobileSubmenuOpen = ref({
      category: false
    })

    const handleSearch = () => {
      if (searchQuery.value.trim()) {
        alert('Tìm kiếm: ' + searchQuery.value)
      }
    }

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
      if (isMobileMenuOpen.value) {
        document.body.classList.add('menu-open')
      } else {
        document.body.classList.remove('menu-open')
        mobileSubmenuOpen.value.category = false
      }
    }

    const toggleMobileSubmenu = (menu) => {
      mobileSubmenuOpen.value[menu] = !mobileSubmenuOpen.value[menu]
    }

    return {
      searchQuery,
      isMobileMenuOpen,
      mobileSubmenuOpen,
      handleSearch,
      toggleMobileMenu,
      toggleMobileSubmenu
    }
  }
}
</script>
