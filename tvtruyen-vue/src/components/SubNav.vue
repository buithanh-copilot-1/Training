<template>
  <div class="sub-nav">
    <div class="container">
      <ul class="sub-nav-menu">
        <li :class="{ active: $route.path === '/' }">
          <router-link to="/">Tất cả</router-link>
        </li>
        <li :class="{ active: $route.path === '/truyen-full' }">
          <router-link to="/truyen-full">Truyện Full</router-link>
        </li>
        <li :class="{ active: $route.path === '/vip' }">
          <router-link to="/vip">Truyện VIP</router-link>
        </li>
        <li :class="{ active: $route.path === '/truyen-hot' }">
          <router-link to="/truyen-hot">Truyện Hot</router-link>
        </li>
        <li :class="{ active: $route.path === '/the-loai/ngon-tinh' }">
          <router-link to="/the-loai/ngon-tinh">Ngôn Tình</router-link>
        </li>
        <li :class="{ active: $route.path === '/the-loai/dam-my' }">
          <router-link to="/the-loai/dam-my">Đam Mỹ</router-link>
        </li>
        <li :class="{ active: $route.path === '/the-loai/tien-hiep' }">
          <router-link to="/the-loai/tien-hiep">Tiên Hiệp</router-link>
        </li>
        <li :class="{ active: $route.path === '/the-loai/huyen-huyen' }">
          <router-link to="/the-loai/huyen-huyen">Huyền Huyễn</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubNav'
}
</script>
