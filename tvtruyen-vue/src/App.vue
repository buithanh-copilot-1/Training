<template>
  <div id="app">
    <AppHeader />
    <SubNav />
    <main class="container">
      <router-view />
    </main>
    <AppFooter />
    <BackToTop />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import SubNav from './components/SubNav.vue'
import AppFooter from './components/AppFooter.vue'
import BackToTop from './components/BackToTop.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    SubNav,
    AppFooter,
    BackToTop
  }
}
</script>
