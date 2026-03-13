<template>
  <div class="back-to-top" :class="{ visible: isVisible }" @click="scrollToTop">
    <i class="fas fa-arrow-up"></i>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'BackToTop',
  setup() {
    const isVisible = ref(false)

    const handleScroll = () => {
      isVisible.value = window.scrollY > 300
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isVisible,
      scrollToTop
    }
  }
}
</script>
